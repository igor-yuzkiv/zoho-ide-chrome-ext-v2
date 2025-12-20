import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { ProviderCapabilityQueryKeys, ProviderCapabilityType } from '@zoho-ide/shared'
import type { IFunctionRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { type MaybeRef, ref, toValue, watch } from 'vue'
import { findCapabilityRecordQuery } from '@/entities/capability/cache'

export function useFunctionDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    functionId: MaybeRef<string>
) {
    const script = ref<string>('')

    const { isPending, data } = useQuery<IFunctionRecordEntity<TOrigin>>({
        queryKey: ProviderCapabilityQueryKeys.forCapabilityRecord(
            providerId,
            ProviderCapabilityType.FUNCTIONS,
            functionId
        ),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return findCapabilityRecordQuery<IFunctionRecordEntity<TOrigin>>(
                toValue(providerId),
                ProviderCapabilityType.FUNCTIONS,
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
