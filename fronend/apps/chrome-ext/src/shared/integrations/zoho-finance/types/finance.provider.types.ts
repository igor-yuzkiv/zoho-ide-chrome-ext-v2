export type ZohoFinanceService = 'books' | 'inventory'

export type FinanceServiceProviderMetadata = {
    host: string
    orgId: string
    financeService: ZohoFinanceService
}
