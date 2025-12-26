import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { capabilityRecordsStorageFactory, ProviderCapabilityQueryKeys } from '@zoho-ide/shared'
import type { IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import { computed, type MaybeRef, toValue } from 'vue'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

export function useCapabilityRecordsList<T extends IBaseCapabilityRecordEntity>(
    capabilityType: MaybeRef<string>,
    providerId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<T[]>({
        queryKey: ProviderCapabilityQueryKeys.forProviderAndType(providerId, capabilityType),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return localCapabilityStorage.findByProviderIdAndCapabilityType<T>(
                toValue(providerId),
                toValue(capabilityType)
            )
        },
        initialData: [],
        enabled: computed(() => !!toValue(providerId) && !!toValue(capabilityType)),
    })

    return {
        isPending,
        data,
    }
}
