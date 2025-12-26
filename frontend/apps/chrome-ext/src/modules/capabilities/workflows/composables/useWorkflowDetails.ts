import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { capabilityRecordsStorageFactory, ProviderCapabilityQueryKeys, ProviderCapabilityType } from '@zoho-ide/shared'
import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { computed, type MaybeRef, toValue } from 'vue'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

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
            return localCapabilityStorage.findById<IWorkflowRecordEntity<TOrigin>>(toValue(workflowId))
        },
        enabled: computed(() => !!toValue(providerId) && !!toValue(workflowId)),
    })

    return {
        isPending,
        data,
    }
}
