export type ZohoServiceProviderType = 'crm' | 'finance'

export type ZohoServiceProvider = {
    id: string
    type: ZohoServiceProviderType
    title: string
    metadata: Record<string, unknown>
    tabId?: number
    serviceIcon: string
    lastSyncedAt?: number
    cacheTtlMs?: number
}
