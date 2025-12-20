import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { CapabilityQueryKeys } from '@zoho-ide/shared'
import type { IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import { type MaybeRef, toValue } from 'vue'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'

export function useCapabilityRecordsList<T extends IBaseCapabilityRecordEntity>(
    capabilityType: MaybeRef<string>,
    providerId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<T[]>({
        queryKey: CapabilityQueryKeys.forProviderAndType(providerId, capabilityType),
        placeholderData: keepPreviousData,
        queryFn: () => selectProviderRecordsQuery<T>(toValue(providerId), toValue(capabilityType)),
        initialData: [],
    })

    return {
        isPending,
        data,
    }
}
