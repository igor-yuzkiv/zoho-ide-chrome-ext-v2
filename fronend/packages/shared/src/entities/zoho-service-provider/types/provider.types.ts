export type ProviderType = 'crm' | 'finance'

export type ZohoServiceProvider = {
    id: string
    type: ProviderType
    title: string
    metadata: Record<string, unknown>
    tabId?: number
    serviceIcon: string
    lastSyncedAt?: number
    cacheTtlMs?: number
}
