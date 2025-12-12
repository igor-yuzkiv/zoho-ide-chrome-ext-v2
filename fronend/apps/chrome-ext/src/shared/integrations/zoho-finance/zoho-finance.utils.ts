import type { Maybe } from '@zoho-ide/shared'
import type {
    FinanceServiceProviderMetadata,
    ZohoFinanceService,
} from '@/shared/integrations/zoho-finance/types/finance.provider.types.ts'

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
