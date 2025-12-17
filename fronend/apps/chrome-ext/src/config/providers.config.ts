import type { Result } from '@zoho-ide/shared'
import { crmServiceProviderFactory } from '@/shared/integrations/zoho-crm/crm.provider.ts'
import { financeServiceProviderFactory } from '@/shared/integrations/zoho-finance/zoho-finance.provider.ts'
import { BrowserTab } from '@/shared/libs/browser/browser.types.ts'
import type { ProviderType, ServiceProvider } from '@zoho-ide/shared'

export const PROVIDER_CACHE_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours

export const ProvidersRegister: Record<ProviderType, (tab: BrowserTab) => Result<ServiceProvider>> = {
    crm: crmServiceProviderFactory,
    finance: financeServiceProviderFactory,
}
