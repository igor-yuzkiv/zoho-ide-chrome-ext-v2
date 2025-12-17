import type { IWorkflowEntity } from '@zoho-ide/shared'
import { CapabilityQueryKeys, CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { IEntity } from '@zoho-ide/shared'
import { type MaybeRef, toValue } from 'vue'
import { findCapabilityRecordQuery } from '@/entities/capability/cache'

export function useWorkflowDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    workflowId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IWorkflowEntity<TOrigin>>({
        queryKey: CapabilityQueryKeys.forCapabilityRecord(providerId, CapabilityType.WORKFLOWS, workflowId),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return findCapabilityRecordQuery<IWorkflowEntity<TOrigin>>(
                toValue(providerId),
                CapabilityType.WORKFLOWS,
                toValue(workflowId)
            )
        },
    })

    return {
        isPending,
        data,
    }
}
