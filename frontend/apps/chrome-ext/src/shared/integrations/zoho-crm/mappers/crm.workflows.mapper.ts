import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { ZohoCrmWorkflow } from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'

export function mapToWorkflowEntity(providerId: string, wf: ZohoCrmWorkflow): IWorkflowRecordEntity<ZohoCrmWorkflow> {
    return {
        id: wf.id,
        sourceId: wf.id,
        providerId,
        capabilityType: ProviderCapabilityType.WORKFLOWS,
        displayName: wf.name,
        description: wf.description || '',
        originEntity: wf,
    }
}

export function mapManyToWorkflowEntity(
    providerId: string,
    workflows: ZohoCrmWorkflow[]
): IWorkflowRecordEntity<ZohoCrmWorkflow>[] {
    return workflows.map((i) => mapToWorkflowEntity(providerId, i))
}

export function assertCrmWorkflowFromEntity(workflow: IWorkflowRecordEntity): ZohoCrmWorkflow | undefined {
    return workflow?.originEntity && (workflow.originEntity as ZohoCrmWorkflow).id
        ? (workflow.originEntity as ZohoCrmWorkflow)
        : undefined
}
