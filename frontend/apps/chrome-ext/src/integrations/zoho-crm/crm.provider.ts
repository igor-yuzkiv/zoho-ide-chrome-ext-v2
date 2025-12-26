import type { Result } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import { resolveCrmServiceProviderMetadataFromUrl } from '@/integrations/zoho-crm/crm.utils.ts'
import type { BrowserTab } from '@/core/browser'

export function formatZohoCrmProviderId(orgId: string): string {
    return `zoho-crm-${orgId}`
}

export function crmServiceProviderFactory(tab: BrowserTab): Result<ZohoServiceProvider> {
    if (!tab.url) {
        return { ok: false, error: 'Tab URL is undefined' }
    }

    const metadata = resolveCrmServiceProviderMetadataFromUrl(tab.url)
    if (!metadata) {
        return { ok: false, error: 'Not a valid Zoho CRM URL' }
    }

    return {
        ok: true,
        value: {
            id: formatZohoCrmProviderId(metadata.orgId),
            type: 'crm',
            title: `Zoho CRM${metadata.isSandbox ? ' Sandbox' : ''} (${metadata.orgId})`,
            metadata: metadata,
            tabId: tab.id,
            serviceIcon: 'arcticons:zoho-crm',
        },
    }
}
