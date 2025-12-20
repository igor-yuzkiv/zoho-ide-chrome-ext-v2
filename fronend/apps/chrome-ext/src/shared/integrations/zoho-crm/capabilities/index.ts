import { crmFieldsCapabilityPortFactory } from './crm.fields.capability.ts'
import { crmFunctionsCapabilityPortFactory } from './crm.functions.capability.ts'
import { crmModulesCapabilityPortFactory } from './crm.modules.capability.ts'
import { crmWorkflowCapabilityPortFactory } from './crm.workflows.capability.ts'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { ProviderCapability } from '@zoho-ide/shared'

export const ZohoCrmCapabilities: ProviderCapability[] = [
    {
        type: ProviderCapabilityType.FUNCTIONS,
        title: 'Zoho CRM Functions',
        icon: 'material-symbols:function',
        portFactory: crmFunctionsCapabilityPortFactory,
    },
    {
        type: ProviderCapabilityType.WORKFLOWS,
        title: 'Zoho CRM Workflows',
        icon: 'mdi:workflow',
        portFactory: crmWorkflowCapabilityPortFactory,
    },
    {
        type: ProviderCapabilityType.MODULES,
        title: 'Zoho CRM Modules Metadata',
        icon: 'streamline-sharp:module',
        portFactory: crmModulesCapabilityPortFactory,
    },
    {
        type: ProviderCapabilityType.FIELDS,
        title: 'Zoho CRM Modules Fields Metadata',
        icon: 'hugeicons:list-setting',
        portFactory: crmFieldsCapabilityPortFactory,
        hideInMenu: true,
    },
]
