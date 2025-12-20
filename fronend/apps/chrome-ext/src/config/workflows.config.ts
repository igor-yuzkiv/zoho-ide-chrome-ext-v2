import type { ZohoServiceProviderType, WorkflowSchemaBuilder } from '@zoho-ide/shared'
import { zohoCrmWorkflowSchemaBuilder } from '@/shared/integrations/zoho-crm/services/crm.workflow-schema.service.ts'

export const WfSchemaNodeType = {
    when: 'WfWhenNode',
    condition: 'WfConditionNode',
    action: 'WfActionNode',
} as const

export const WorkflowSchemaBuilderRegister: Partial<Record<ZohoServiceProviderType, WorkflowSchemaBuilder>> = {
    crm: zohoCrmWorkflowSchemaBuilder,
}
