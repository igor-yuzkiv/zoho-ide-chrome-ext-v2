import { useRouteParams } from '@vueuse/router'
import { computed, type MaybeRefOrGetter, ref, toValue, watch } from 'vue'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'

export function useCurrentProvider(routeParamKey: MaybeRefOrGetter = 'providerId') {
    const data = ref<ServiceProvider | undefined>()
    const providers = useProvidersStore()
    const providerId = useRouteParams<string>(toValue(routeParamKey))
    const title = computed(() => data.value?.title)

    watch(providerId, (newId) => {
        console.log('watch')
        data.value = providers.findById(newId)
    })

    return {
        id: providerId,
        data,
        title,
    }
}
