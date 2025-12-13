import { crmServiceProviderFactory } from '@/shared/integrations/zoho-crm/crm.provider.ts'
import { financeServiceProviderFactory } from '@/shared/integrations/zoho-finance/zoho-finance.provider.ts'
import type { ProviderType, ServiceProviderFactory } from '@/entities/provider/provider.types.ts'

export const PROVIDER_CACHE_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours

export const ProvidersRegister: Record<ProviderType, ServiceProviderFactory> = {
    crm: crmServiceProviderFactory,
    finance: financeServiceProviderFactory,
}
