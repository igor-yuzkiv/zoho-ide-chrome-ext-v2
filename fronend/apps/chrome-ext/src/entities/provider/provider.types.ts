import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'
import type { Result } from '@zoho-ide/shared'

export type ProviderType = 'crm' | 'finance'

export type ServiceProvider = {
    id: string
    type: ProviderType
    title: string
    metadata: Record<string, unknown>
    tabId?: number
    serviceIcon: string
}

export type ServiceProviderFactory = (tab: BrowserTab) => Result<ServiceProvider>
