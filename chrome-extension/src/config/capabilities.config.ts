import { crmFieldsCapabilityPortFactory } from '@/shared/integrations/zoho-crm/capabilities/crm.fields.capability.ts'
import { crmFunctionsCapabilityPortFactory } from '@/shared/integrations/zoho-crm/capabilities/crm.functions.capability.ts'
import { crmModulesCapabilityPortFactory } from '@/shared/integrations/zoho-crm/capabilities/crm.modules.capability.ts'
import { crmWorkflowCapabilityPortFactory } from '@/shared/integrations/zoho-crm/capabilities/crm.workflows.capability.ts'
import type { ProviderCapability } from '@/core/types/capability.types.ts'
import type { ProviderType } from '@/core/types/provider.types.ts'

export const CapabilityType = {
    FUNCTIONS: 'functions',
    WORKFLOWS: 'workflows',
    MODULES: 'modules',
    FIELDS: 'fields',
} as const

export const CAPABILITY_DEFAULT_ICON = 'carbon:undefined'

export const CapabilitiesRegister: Record<ProviderType, ProviderCapability[]> = {
    crm: [
        {
            type: CapabilityType.FUNCTIONS,
            title: 'Zoho CRM Functions',
            icon: 'material-symbols:function',
            portFactory: crmFunctionsCapabilityPortFactory,
        },
        {
            type: CapabilityType.WORKFLOWS,
            title: 'Zoho CRM Workflows',
            icon: 'mdi:workflow',
            portFactory: crmWorkflowCapabilityPortFactory,
        },
        {
            type: CapabilityType.MODULES,
            title: 'Zoho CRM Modules Metadata',
            icon: 'streamline-sharp:module',
            portFactory: crmModulesCapabilityPortFactory,
        },
        {
            type: CapabilityType.FIELDS,
            title: 'Zoho CRM Modules Fields Metadata',
            icon: 'hugeicons:list-setting',
            portFactory: crmFieldsCapabilityPortFactory,
            hideInMenu: true,
        },
    ],
    finance: [],
}
