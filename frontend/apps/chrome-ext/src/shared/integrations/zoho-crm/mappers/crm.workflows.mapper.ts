import { type IWorkflowRecordEntity, makeProviderCapabilityId, ProviderCapabilityType } from '@zoho-ide/shared'
import type { ZohoCrmWorkflow } from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'

export function mapToWorkflowEntity(providerId: string, wf: ZohoCrmWorkflow): IWorkflowRecordEntity<ZohoCrmWorkflow> {
    return {
        id: makeProviderCapabilityId(providerId, ProviderCapabilityType.WORKFLOWS, wf.id),
        source_id: wf.id,
        provider_id: providerId,
        capability_type: ProviderCapabilityType.WORKFLOWS,
        display_name: wf.name,
        description: wf.description || '',
        origin_entity: wf,
    }
}

export function mapManyToWorkflowEntity(
    providerId: string,
    workflows: ZohoCrmWorkflow[]
): IWorkflowRecordEntity<ZohoCrmWorkflow>[] {
    return workflows.map((i) => mapToWorkflowEntity(providerId, i))
}

export function assertCrmWorkflowFromEntity(workflow: IWorkflowRecordEntity): ZohoCrmWorkflow | undefined {
    return workflow?.origin_entity && (workflow.origin_entity as ZohoCrmWorkflow).id
        ? (workflow.origin_entity as ZohoCrmWorkflow)
        : undefined
}
