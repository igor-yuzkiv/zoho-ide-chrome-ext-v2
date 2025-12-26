import { crmFieldsCapabilityAdapterFactory } from './crm.fields.adapter.ts'
import { crmFunctionsCapabilityAdapterFactory } from './crm.functions.adapter.ts'
import { crmModulesCapabilityAdapterFactory } from './crm.modules.adapter.ts'
import { crmWorkflowCapabilityAdapterFactory } from './crm.workflows.adapter.ts'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { ServiceProviderCapability } from '@zoho-ide/shared'

export const ZohoCrmCapabilities: ServiceProviderCapability[] = [
    {
        type: ProviderCapabilityType.FUNCTIONS,
        title: 'Zoho CRM Functions',
        icon: 'material-symbols:function',
        adapterFactory: crmFunctionsCapabilityAdapterFactory,
    },
    {
        type: ProviderCapabilityType.WORKFLOWS,
        title: 'Zoho CRM Workflows',
        icon: 'mdi:workflow',
        adapterFactory: crmWorkflowCapabilityAdapterFactory,
    },
    {
        type: ProviderCapabilityType.MODULES,
        title: 'Zoho CRM Modules Metadata',
        icon: 'streamline-sharp:module',
        adapterFactory: crmModulesCapabilityAdapterFactory,
    },
    {
        type: ProviderCapabilityType.FIELDS,
        title: 'Zoho CRM Modules Fields Metadata',
        icon: 'hugeicons:list-setting',
        adapterFactory: crmFieldsCapabilityAdapterFactory,
        hideInMenu: true,
    },
]
