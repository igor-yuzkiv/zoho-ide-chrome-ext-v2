import type { Maybe } from '@/shared/types/result.types.ts'
import { ZOHO_CRM_REGULAR_URL_REGEX, ZOHO_CRM_SANDBOX_URL_REGEX } from '@/shared/integrations/zoho-crm/crm.config.ts'
import type { CrmServiceProviderMetadata } from '@/shared/integrations/zoho-crm/types/crm.provider.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

export function resolveCrmServiceProviderMetadataFromUrl(url: string): Maybe<CrmServiceProviderMetadata> {
    let isSandbox = false

    let match = url.match(ZOHO_CRM_REGULAR_URL_REGEX)
    if (!match || match?.length !== 3) {
        match = url.match(ZOHO_CRM_SANDBOX_URL_REGEX)
        isSandbox = true
    }

    if (!match || match?.length !== 3) {
        return
    }

    const [, host, orgId] = match
    if (!orgId || !host) {
        return
    }

    return { host, orgId, isSandbox }
}

export function assertCrmMetadata(provider: ServiceProvider): Maybe<CrmServiceProviderMetadata> {
    if (provider.metadata && provider?.metadata?.orgId) {
        return provider.metadata as CrmServiceProviderMetadata
    }
}
