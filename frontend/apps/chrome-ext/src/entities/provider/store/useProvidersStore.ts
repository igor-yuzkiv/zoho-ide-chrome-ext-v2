import { ProvidersRegister } from '@/config/providers.config.ts'
import { type Serializer, useStorage } from '@vueuse/core'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'
import { useBrowserTabsStore } from '@/shared/libs/browser/store/useBrowserTabsStore.ts'

const LocalStorageSerializer: Serializer<ZohoServiceProvider[]> = {
    read(raw) {
        try {
            const parsed = JSON.parse(raw || '[]')
            return Array.isArray(parsed) ? parsed : []
        } catch (error) {
            console.error('Failed to parse service providers from localStorage:', error)
            return []
        }
    },
    write(value) {
        return JSON.stringify(
            value.map((sp) => ({
                ...sp,
                tabId: undefined,
            }))
        )
    },
}

function resolveProvidersFromChromeTabs(chromeTabs: BrowserTab[], prev = new Map()): Map<string, ZohoServiceProvider> {
    return Object.values(ProvidersRegister).reduce<Map<string, ZohoServiceProvider>>((acc, factory) => {
        for (const tab of chromeTabs) {
            const result = factory(tab)
            if (!result.ok) {
                continue
            }
            const instance = prev.has(result.value.id) ? prev.get(result.value.id) : result.value

            instance.tabId = tab.id
            acc.set(instance.id, instance)
        }

        return acc
    }, prev)
}

export const useProvidersStore = defineStore('providers', () => {
    const tabs = useBrowserTabsStore()
    const providersMap = ref<Map<string, ZohoServiceProvider>>(new Map())
    const providersList = computed(() => Array.from(providersMap.value.values()))
    const cachedProviders = useStorage('service-providers', [], undefined, {
        serializer: LocalStorageSerializer,
    })

    function bootstrap() {
        if (!cachedProviders.value.length) {
            return
        }

        const normalized = new Map<string, ZohoServiceProvider>()
        for (const sp of cachedProviders.value) {
            if (sp?.tabId || !sp.tabId || !tabs.items.has(sp.tabId)) {
                sp.tabId = undefined
            }

            normalized.set(sp.id, sp)
        }

        providersMap.value = normalized
    }

    async function handleChangeBrowserTabs(newTabs: Map<number, BrowserTab>) {
        const prev = new Map<string, ZohoServiceProvider>(providersMap.value)
        const next = resolveProvidersFromChromeTabs(Array.from(newTabs.values()), prev)

        const normalized = new Map<string, ZohoServiceProvider>()
        for (const sp of next.values()) {
            const tabId = sp.tabId && newTabs.has(sp.tabId) ? sp.tabId : undefined
            normalized.set(sp.id, { ...sp, tabId })
        }

        providersMap.value = normalized
        cachedProviders.value = Array.from(normalized.values())

        console.log('TABS', Array.from(newTabs.values()))
    }

    function findById(providerId: string): ZohoServiceProvider | undefined {
        return providersMap.value.get(providerId)
    }

    function updateProvider(providerId: string, updates: Partial<ZohoServiceProvider>) {
        const provider = providersMap.value.get(providerId)
        if (!provider) {
            return
        }

        const updatedProvider = { ...provider, ...updates }
        providersMap.value.set(providerId, updatedProvider)
        cachedProviders.value = Array.from(providersMap.value.values())
    }

    function isProviderOnline(providerId: string): boolean {
        const provider = providersMap.value.get(providerId)
        return Boolean(provider?.tabId)
    }

    function findProviderById(providerId: string): ZohoServiceProvider | undefined {
        return providersMap.value.get(providerId)
    }

    return {
        providersMap,
        providersList,
        bootstrap,
        findById,
        handleChangeBrowserTabs,
        updateProvider,
        isProviderOnline,
        findProviderById,
    }
})
