import type { Result } from '@zoho-ide/shared'
import type { ZohoServiceProvider, ZohoServiceProviderType } from '@zoho-ide/shared'
import { crmServiceProviderFactory } from '@/shared/integrations/zoho-crm/crm.provider.ts'
import { financeServiceProviderFactory } from '@/shared/integrations/zoho-finance/zoho-finance.provider.ts'
import { BrowserTab } from '@/shared/libs/browser/browser.types.ts'

export const PROVIDER_CACHE_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours

export const ProvidersRegister: Record<ZohoServiceProviderType, (tab: BrowserTab) => Result<ZohoServiceProvider>> = {
    crm: crmServiceProviderFactory,
    finance: financeServiceProviderFactory,
}
