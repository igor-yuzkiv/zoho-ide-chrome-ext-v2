import type { BrowserTab } from '@/core/browser'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchMockData, isMockApiEnabled } from '@/shared/mock-api/mock.api.ts'

async function fetchBrowserTabsRequest(): Promise<BrowserTab[]> {
    return isMockApiEnabled()
        ? fetchMockData('chrome-tabs.json').then((data) => (Array.isArray(data) ? data : []))
        : chrome.tabs.query({})
}

export const useBrowserTabsStore = defineStore('browser.tabs', () => {
    const items = ref<Map<number, BrowserTab>>(new Map())

    async function refetch() {
        const response = await fetchBrowserTabsRequest()

        items.value = response.reduce<Map<number, BrowserTab>>((acc, tab) => {
            if (tab && tab.id) {
                acc.set(tab.id, tab)
            }

            return acc
        }, new Map())
    }

    function upsert(tab: BrowserTab) {
        if (!tab.id) {
            return
        }

        const next = new Map(items.value)
        next.set(tab.id, tab)

        items.value = next
    }

    function remove(tabId: number) {
        const next = new Map(items.value)
        next.delete(tabId)
        items.value = next
    }

    const onUpdated = (tabId: number, changeInfo: chrome.tabs.OnUpdatedInfo, tab: BrowserTab) => {
        if (tabId && changeInfo?.status === 'complete') {
            upsert(tab)
        }
    }

    const onRemoved = (tabId: number) => remove(tabId)

    async function bootstrap() {
        await refetch()

        if (!isMockApiEnabled() && typeof chrome !== 'undefined' && chrome?.tabs) {
            chrome.tabs.onUpdated.addListener(onUpdated)
            chrome.tabs.onRemoved.addListener(onRemoved)
        }
    }

    return {
        items,
        bootstrap,
        refetch,
    }
})
