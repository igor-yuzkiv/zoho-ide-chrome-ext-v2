import { CapabilityQueryKeys } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, toValue } from 'vue'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'
import type { ICapabilityEntity } from '@zoho-ide/shared'

export function useCapabilityRecordsList<T extends ICapabilityEntity>(
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
