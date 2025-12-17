import { zohoCrmWorkflowSchemaBuilder } from '@/shared/integrations/zoho-crm/services/crm.workflow-schema.service.ts'
import type { ProviderType, WorkflowSchemaBuilder } from '@zoho-ide/shared'

export const WfSchemaNodeType = {
    when: 'WfWhenNode',
    condition: 'WfConditionNode',
    action: 'WfActionNode',
} as const

export const WorkflowSchemaBuilderRegister: Partial<Record<ProviderType, WorkflowSchemaBuilder>> = {
    crm: zohoCrmWorkflowSchemaBuilder,
}
