import {
    crmFunctionsCapabilityPortFactory
} from '@/shared/integrations/zoho-crm/capabilities/crm.functions.capability.ts'
import {
    crmWorkflowCapabilityPortFactory
} from '@/shared/integrations/zoho-crm/capabilities/crm.workflows.capability.ts'
import { crmModulesCapabilityPortFactory } from '@/shared/integrations/zoho-crm/capabilities/crm.modules.capability.ts'
import { crmFieldsCapabilityPortFactory } from '@/shared/integrations/zoho-crm/capabilities/crm.fields.capability.ts'
import { CapabilityType } from '@/config/capabilities.config.ts'

export default [
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
];