import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

export function useCurrentProvider() {
    const providers = useProvidersStore()
    const providerId = useRouteParams<string>('providerId')
    const data = computed(() => providers.findById(providerId.value))

    const isOnline = computed(() => !!data.value?.tabId);

    function update(newData: Partial<ServiceProvider>) {
        if (!providerId.value) {
            return
        }

        providers.updateProvider(providerId.value, newData)
    }

    return {
        id: providerId,
        data,
        update,
        isOnline,
    }
}
