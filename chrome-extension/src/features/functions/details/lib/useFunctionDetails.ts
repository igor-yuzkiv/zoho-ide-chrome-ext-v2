import { CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, ref, toValue, watch } from 'vue'
import type { IEntity } from '@/shared/types/entitiy.types.ts'
import type { IFunctionEntity } from '@/entities/function/model/function.types.ts'
import { findCapabilityRecordQuery } from '@/core/cache'

export function useFunctionDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    functionId: MaybeRef<string>
) {
    const script = ref<string>('')

    const { isPending, data } = useQuery<IFunctionEntity<TOrigin>>({
        queryKey: [providerId, functionId],
        placeholderData: keepPreviousData,
        queryFn: () => {
            return findCapabilityRecordQuery<IFunctionEntity<TOrigin>>(
                toValue(providerId),
                CapabilityType.FUNCTIONS,
                toValue(functionId)
            )
        },
    })

    watch(data, (newValue) => (script.value = newValue?.script || ''))

    return {
        isPending,
        data,
        script,
    }
}
