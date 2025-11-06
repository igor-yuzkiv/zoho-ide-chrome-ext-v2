import type { ZohoCrmWorkflow } from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'
import type { IWorkflowEntity } from '@/entities/workflow/model/workflow.types.ts'

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
    if (workflow?.originEntity && (workflow.originEntity as ZohoCrmWorkflow).id) {
        return workflow.originEntity as ZohoCrmWorkflow
    }
}
