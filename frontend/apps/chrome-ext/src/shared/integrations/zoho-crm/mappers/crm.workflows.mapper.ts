import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import type { ZohoCrmWorkflow } from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'

export function mapToWorkflowEntity(wf: ZohoCrmWorkflow): IWorkflowRecordEntity<ZohoCrmWorkflow> {
    return {
        id: wf.id,
        sourceId: wf.id,
        displayName: wf.name,
        description: wf.description || '',
        originEntity: wf,
    }
}

export function mapManyToWorkflowEntity(workflows: ZohoCrmWorkflow[]): IWorkflowRecordEntity<ZohoCrmWorkflow>[] {
    return workflows.map(mapToWorkflowEntity)
}

export function assertCrmWorkflowFromEntity(workflow: IWorkflowRecordEntity): ZohoCrmWorkflow | undefined {
    return workflow?.originEntity && (workflow.originEntity as ZohoCrmWorkflow).id
        ? (workflow.originEntity as ZohoCrmWorkflow)
        : undefined
}
