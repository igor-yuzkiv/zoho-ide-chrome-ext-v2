import { capitalize } from 'vue'
import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'
import type { Result } from '@zoho-ide/shared'
import type { ZohoFinanceService } from '@/shared/integrations/zoho-finance/types/finance.provider.types.ts'
import { resolveFinanceProviderMetadataFromUrl } from '@/shared/integrations/zoho-finance/zoho-finance.utils.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

const SERVICE_ICONS: Record<ZohoFinanceService, string> = {
    books: 'ph:books',
    inventory: 'material-symbols:forklift',
}

export function financeServiceProviderFactory(tab: BrowserTab): Result<ServiceProvider> {
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
            id: `zoho-finance-${metadata.orgId}`,
            type: 'finance',
            title: `Zoho ${capitalize(metadata.financeService)} (${metadata.orgId})`,
            metadata: metadata,
            tabId: tab.id,
            serviceIcon: SERVICE_ICONS[metadata.financeService],
        },
    }
}
