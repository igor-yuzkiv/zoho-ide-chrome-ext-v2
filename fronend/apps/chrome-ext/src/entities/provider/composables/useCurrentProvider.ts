import { useRouteParams } from '@vueuse/router'
import type { Maybe } from '@zoho-ide/shared'
import { computed } from 'vue'
import type { CapabilityPort } from '@/entities/capability/capability.types.ts'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'

export function useCurrentProvider() {
    const capabilitiesConfig = useCapabilitiesConfig()

    const providers = useProvidersStore()
    const providerId = useRouteParams<string>('providerId')
    const data = computed(() => providers.findById(providerId.value))
    const isOnline = computed(() => !!data.value?.tabId)

    const capabilities = computed(() => {
        return data.value ? capabilitiesConfig.byProvider(data.value).filter((c) => !c?.hideInMenu) : []
    })

    function update(newData: Partial<ServiceProvider>) {
        if (!providerId.value) {
            return
        }

        providers.updateProvider(providerId.value, newData)
    }

    function resolvePort(capabilityType: string): Maybe<CapabilityPort> {
        if (!data.value) {
            return null
        }

        return capabilitiesConfig.resolvePort(data.value, capabilityType)
    }

    return {
        id: providerId,
        isOnline,
        data,
        update,
        capabilities,
        resolvePort,
    }
}
