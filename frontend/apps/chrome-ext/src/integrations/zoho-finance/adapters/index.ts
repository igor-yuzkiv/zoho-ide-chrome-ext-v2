import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { ServiceProviderCapability } from '@zoho-ide/shared'
import { financeFunctionsCapabilityAdapterFactory } from './finance.functions.adapter.ts'

export const ZohoFinanceCapabilities: ServiceProviderCapability[] = [
    {
        type: ProviderCapabilityType.FUNCTIONS,
        title: 'Zoho Finance Functions',
        icon: 'material-symbols:function',
        adapterFactory: financeFunctionsCapabilityAdapterFactory,
    },
]
