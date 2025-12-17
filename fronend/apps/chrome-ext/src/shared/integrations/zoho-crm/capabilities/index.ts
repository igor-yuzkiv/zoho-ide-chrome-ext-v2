import { crmFieldsCapabilityPortFactory } from './crm.fields.capability.ts'
import { crmFunctionsCapabilityPortFactory } from './crm.functions.capability.ts'
import { crmModulesCapabilityPortFactory } from './crm.modules.capability.ts'
import { crmWorkflowCapabilityPortFactory } from './crm.workflows.capability.ts'
import { CapabilityType } from '@/config/capabilities.config.ts'
import type { ProviderCapability } from '@zoho-ide/shared'

export const ZohoCrmCapabilities: ProviderCapability[] = [
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
]
