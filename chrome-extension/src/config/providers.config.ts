import { crmServiceProviderFactory } from '@/shared/integrations/zoho-crm/crm.provider.ts'
import { financeServiceProviderFactory } from '@/shared/integrations/zoho-finance/zoho-finance.provider.ts'
import type { ProviderType, ServiceProviderFactory } from '@/entities/provider/provider.types.ts'

export const ProvidersRegister: Record<ProviderType, ServiceProviderFactory> = {
    crm: crmServiceProviderFactory,
    finance: financeServiceProviderFactory,
}
