import type { Result } from '@zoho-ide/shared'
import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'

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

export type ServiceProviderFactory = (tab: BrowserTab) => Result<ServiceProvider>
