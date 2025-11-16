import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import { resolveCrmServiceProviderMetadataFromUrl } from '@/shared/integrations/zoho-crm/crm.utils.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

export function formatZohoCrmProviderId(orgId: string): string {
    return `zoho-crm-${orgId}`
}

export function crmServiceProviderFactory(tab: BrowserTab): Result<ServiceProvider> {
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
