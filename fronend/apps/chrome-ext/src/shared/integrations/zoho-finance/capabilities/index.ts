import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { ServiceProviderCapability } from '@zoho-ide/shared'
import { financeFunctionsCapabilityPortFactory } from '@/shared/integrations/zoho-finance/capabilities/finance.functions.capability.ts'

export const ZohoFinanceCapabilities: ServiceProviderCapability[] = [
    {
        type: ProviderCapabilityType.FUNCTIONS,
        title: 'Zoho Finance Functions',
        icon: 'material-symbols:function',
        adapterFactory: financeFunctionsCapabilityPortFactory,
    },
]
