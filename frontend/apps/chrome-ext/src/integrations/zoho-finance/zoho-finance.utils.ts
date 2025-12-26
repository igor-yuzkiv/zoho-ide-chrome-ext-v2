import type {
    FinanceServiceProviderMetadata,
    ZohoFinanceService,
} from '@/integrations/zoho-finance/types/finance.provider.types.ts'
import type { Maybe } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'

const FINANCE_SERVICE_URL_REGEX = /^(https:\/\/(books|inventory)\.zoho\.[a-z]{2,})\/app\/(\d+)/

export function resolveFinanceProviderMetadataFromUrl(url: string): Maybe<FinanceServiceProviderMetadata> {
    if (!url) {
        return
    }

    const match = url.match(FINANCE_SERVICE_URL_REGEX)
    if (!match || match.length !== 4) {
        return
    }

    const [, host, serviceType, orgId] = match
    if (!host || !serviceType || !orgId) {
        return
    }

    return {
        host,
        orgId,
        financeService: serviceType as ZohoFinanceService,
    }
}

export function assertFinanceMetadata(provider: ZohoServiceProvider): FinanceServiceProviderMetadata | undefined {
    return provider.metadata && provider?.metadata?.orgId && provider.metadata?.financeService
        ? (provider.metadata as FinanceServiceProviderMetadata)
        : undefined
}

export function formatZohoFinanceProviderId(orgId: string): string {
    return `zoho-finance-${orgId}`
}
