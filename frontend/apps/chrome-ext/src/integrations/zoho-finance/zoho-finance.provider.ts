import type { Result } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import { capitalize } from 'vue'
import type { ZohoFinanceService } from '@/integrations/zoho-finance/types/finance.provider.types.ts'
import {
    formatZohoFinanceProviderId,
    resolveFinanceProviderMetadataFromUrl,
} from '@/integrations/zoho-finance/zoho-finance.utils.ts'
import type { BrowserTab } from '@/core/browser'

const SERVICE_ICONS: Record<ZohoFinanceService, string> = {
    books: 'ph:books',
    inventory: 'material-symbols:forklift',
}

export function financeServiceProviderFactory(tab: BrowserTab): Result<ZohoServiceProvider> {
    if (!tab.url) {
        return { ok: false, error: 'Tab URL is undefined' }
    }

    const metadata = resolveFinanceProviderMetadataFromUrl(tab.url)
    if (!metadata) {
        return { ok: false, error: 'Not a valid Zoho Finance URL' }
    }

    return {
        ok: true,
        value: {
            id: formatZohoFinanceProviderId(metadata.orgId),
            type: 'finance',
            title: `Zoho ${capitalize(metadata.financeService)} (${metadata.orgId})`,
            metadata: metadata,
            tabId: tab.id,
            serviceIcon: SERVICE_ICONS[metadata.financeService],
            cacheTtlMs: 4 * 60 * 60 * 1000, // 4 hours
        },
    }
}
