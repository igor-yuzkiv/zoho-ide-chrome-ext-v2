import type { IWorkflowEntity } from '@zoho-ide/shared'
import type { ZohoCrmWorkflow } from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'

export function mapToWorkflowEntity(wf: ZohoCrmWorkflow): IWorkflowEntity<ZohoCrmWorkflow> {
    return {
        id: wf.id,
        displayName: wf.name,
        description: wf.description || '',
        originEntity: wf,
    }
}

export function mapManyToWorkflowEntity(workflows: ZohoCrmWorkflow[]): IWorkflowEntity<ZohoCrmWorkflow>[] {
    return workflows.map(mapToWorkflowEntity)
}

export function assertCrmWorkflowFromEntity(workflow: IWorkflowEntity): ZohoCrmWorkflow | undefined {
    return workflow?.originEntity && (workflow.originEntity as ZohoCrmWorkflow).id
        ? (workflow.originEntity as ZohoCrmWorkflow)
        : undefined
}
