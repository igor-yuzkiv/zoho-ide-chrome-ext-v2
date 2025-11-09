import { CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, toValue } from 'vue'
import type { IEntity } from '@/shared/types/entitiy.types.ts'
import type { IWorkflowEntity } from '@/capabilities/workflow/workflow.types.ts'
import { findCapabilityRecordQuery } from '@/shared/cache'

export function useWorkflowDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    workflowId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IWorkflowEntity<TOrigin>>({
        queryKey: [providerId, workflowId],
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
