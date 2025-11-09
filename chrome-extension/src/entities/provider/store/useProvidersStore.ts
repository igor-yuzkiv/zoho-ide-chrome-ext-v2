import { ProvidersRegister } from '@/config/providers.config.ts'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'
import type { Maybe } from '@/shared/types/result.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

function resolveProvidersFromChromeTabs(chromeTabs: BrowserTab[], acc = new Map()): Map<string, ServiceProvider> {
    return Object.values(ProvidersRegister).reduce<Map<string, ServiceProvider>>((acc, factory) => {
        for (const tab of chromeTabs) {
            const result = factory(tab)
            if (result.ok) {
                const instance = result.value
                acc.set(instance.id, result.value)
            }
        }

        return acc
    }, acc)
}

export const useProvidersStore = defineStore('providers', () => {
    const providersMap = ref<Map<string, ServiceProvider>>(new Map())
    const providersList = computed(() => Array.from(providersMap.value.values()))

    function bootstrap() {

    }

    async function initializeProviders(tabs: Map<number, BrowserTab>) {
        const prev = providersMap.value
        const next = resolveProvidersFromChromeTabs(Array.from(tabs.values()), prev)

        const normalized = new Map<string, ServiceProvider>()
        for (const sp of next.values()) {
            const tabId = sp.tabId && tabs.has(sp.tabId) ? sp.tabId : undefined
            normalized.set(sp.id, { ...sp, tabId })
        }

        providersMap.value = normalized
    }

    function findById(providerId: string): Maybe<ServiceProvider> {
        return providersMap.value.get(providerId) || null
    }

    return {
        providersMap,
        providersList,
        initializeProviders,
        bootstrap,
        findById,
    }
})
