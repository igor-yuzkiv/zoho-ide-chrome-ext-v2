import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import {
    capabilityRecordsStorageFactory,
    type IBaseCapabilityRecordEntity,
    ProviderCapabilityQueryKeys,
} from '@zoho-ide/shared'
import { computed, MaybeRef, toValue } from 'vue'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

export function useCapabilityRecordByIdQuery<T extends IBaseCapabilityRecordEntity>(
    providerId: MaybeRef<string>,
    capabilityType: MaybeRef<string>,
    capabilityId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<T>({
        queryKey: ProviderCapabilityQueryKeys.forCapabilityRecord(providerId, capabilityType, capabilityId),
        placeholderData: keepPreviousData,
        queryFn: () => localCapabilityStorage.findById<T>(toValue(capabilityId)),
        enabled: computed(() => !!toValue(providerId) && !!toValue(capabilityType) && !!toValue(capabilityId)),
    })

    return {
        isPending,
        data,
    }
}
