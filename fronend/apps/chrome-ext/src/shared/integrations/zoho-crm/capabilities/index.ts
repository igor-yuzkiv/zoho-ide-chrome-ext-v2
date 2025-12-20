import { crmFieldsCapabilityPortFactory } from './crm.fields.capability.ts'
import { crmFunctionsCapabilityPortFactory } from './crm.functions.capability.ts'
import { crmModulesCapabilityPortFactory } from './crm.modules.capability.ts'
import { crmWorkflowCapabilityPortFactory } from './crm.workflows.capability.ts'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { ServiceProviderCapability } from '@zoho-ide/shared'

export const ZohoCrmCapabilities: ServiceProviderCapability[] = [
    {
        type: ProviderCapabilityType.FUNCTIONS,
        title: 'Zoho CRM Functions',
        icon: 'material-symbols:function',
        adapterFactory: crmFunctionsCapabilityPortFactory,
    },
    {
        type: ProviderCapabilityType.WORKFLOWS,
        title: 'Zoho CRM Workflows',
        icon: 'mdi:workflow',
        adapterFactory: crmWorkflowCapabilityPortFactory,
    },
    {
        type: ProviderCapabilityType.MODULES,
        title: 'Zoho CRM Modules Metadata',
        icon: 'streamline-sharp:module',
        adapterFactory: crmModulesCapabilityPortFactory,
    },
    {
        type: ProviderCapabilityType.FIELDS,
        title: 'Zoho CRM Modules Fields Metadata',
        icon: 'hugeicons:list-setting',
        adapterFactory: crmFieldsCapabilityPortFactory,
        hideInMenu: true,
    },
]
