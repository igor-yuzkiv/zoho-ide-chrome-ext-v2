import { CapabilityType } from '@/config/capabilities.config.ts'
import { financeFunctionsCapabilityPortFactory } from '@/shared/integrations/zoho-finance/capabilities/finance.functions.capability.ts'
import type { ProviderCapability } from '@/entities/capability/capability.types.ts'

export const ZohoFinanceCapabilities: ProviderCapability[] = [
    {
        type: CapabilityType.FUNCTIONS,
        title: 'Zoho Finance Functions',
        icon: 'material-symbols:function',
        portFactory: financeFunctionsCapabilityPortFactory,
    },
]
