import { zohoCrmWorkflowSchemaBuilder } from '@/shared/integrations/zoho-crm/services/crm.workflow-schema.service.ts'
import type { WorkflowSchemaBuilder } from '@/capabilities/workflow/workflow.types.ts'
import type { ProviderType } from '@/entities/provider/provider.types.ts'

export const WfSchemaNodeType = {
    when: 'WfWhenNode',
    condition: 'WfConditionNode',
    action: 'WfActionNode',
} as const

export const WorkflowSchemaBuilderRegister: Partial<Record<ProviderType, WorkflowSchemaBuilder>> = {
    crm: zohoCrmWorkflowSchemaBuilder,
}
