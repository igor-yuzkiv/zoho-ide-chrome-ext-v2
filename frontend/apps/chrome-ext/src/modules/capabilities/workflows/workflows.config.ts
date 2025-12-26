import { zohoCrmWorkflowSchemaBuilder } from '@/integrations/zoho-crm/services/crm.workflow-schema.service.ts'
import type { WorkflowSchemaBuilder, ZohoServiceProviderType } from '@zoho-ide/shared'

export const WfSchemaNodeType = {
    when: 'WfWhenNode',
    condition: 'WfConditionNode',
    action: 'WfActionNode',
} as const

export const WorkflowSchemaBuilderRegister: Partial<Record<ZohoServiceProviderType, WorkflowSchemaBuilder>> = {
    crm: zohoCrmWorkflowSchemaBuilder,
}
