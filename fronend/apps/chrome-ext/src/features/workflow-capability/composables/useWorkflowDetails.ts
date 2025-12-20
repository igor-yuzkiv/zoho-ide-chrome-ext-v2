import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { ProviderCapabilityQueryKeys, ProviderCapabilityType } from '@zoho-ide/shared'
import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { type MaybeRef, toValue } from 'vue'
import { findCapabilityRecordQuery } from '@/entities/capability/cache'

export function useWorkflowDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    workflowId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IWorkflowRecordEntity<TOrigin>>({
        queryKey: ProviderCapabilityQueryKeys.forCapabilityRecord(
            providerId,
            ProviderCapabilityType.WORKFLOWS,
            workflowId
        ),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return findCapabilityRecordQuery<IWorkflowRecordEntity<TOrigin>>(
                toValue(providerId),
                ProviderCapabilityType.WORKFLOWS,
                toValue(workflowId)
            )
        },
    })

    return {
        isPending,
        data,
    }
}
