import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, toValue } from 'vue'
import type { ICapabilityEntity } from '@/core/types/capability.types.ts'
import { selectProviderRecordsQuery } from '@/core/cache'

export function useCapabilityRecordsQuery<T extends ICapabilityEntity>(
    capabilityType: MaybeRef<string>,
    providerId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<T[]>({
        queryKey: [capabilityType, providerId],
        placeholderData: keepPreviousData,
        queryFn: () => selectProviderRecordsQuery<T>(toValue(providerId), toValue(capabilityType)),
        staleTime: 10 * 60 * 1000, // 2 minutes
    })

    return {
        isPending,
        data,
    }
}
