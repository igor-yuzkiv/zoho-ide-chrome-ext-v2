import { fetchMockData } from '@/shared/api/mock/mock.api.ts'
import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'

function regular(): Promise<BrowserTab[]> {
    return chrome.tabs.query({})
}

function mock(): Promise<BrowserTab[]> {
    return fetchMockData('chrome-tabs.json').then((data) => (Array.isArray(data) ? data : []))
}

export default function (): Promise<BrowserTab[]> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock() : regular()
}
