export type ProviderType = 'crm' | 'finance'

export type ServiceProvider = {
    id: string
    type: ProviderType
    title: string
    metadata: Record<string, unknown>
    tabId?: number
    serviceIcon: string
    lastSyncedAt?: number
    cacheTtlMs?: number
}

export type ProviderSettingForm = {
    title: string
    cacheTtlMs: number
}
