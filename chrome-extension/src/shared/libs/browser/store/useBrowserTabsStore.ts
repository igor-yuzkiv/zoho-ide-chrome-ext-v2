import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BrowserTab } from '@/shared/libs/browser/browser.types.ts'
import fetchBrowserTabsRequest from '@/shared/libs/browser/requests/fetch-browser-tabs.request.ts'

type ItemsType = Map<number, BrowserTab>

const isMock = () => import.meta.env.VITE_MOCK_API === 'true'

export const useBrowserTabsStore = defineStore('browser.tabs', () => {
    const items = ref<ItemsType>(new Map())

    async function refetch() {
        const response = await fetchBrowserTabsRequest()

        items.value = response.reduce<ItemsType>((acc, tab) => {
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

    async function init() {
        await refetch()

        if (!isMock() && typeof chrome !== 'undefined' && chrome?.tabs) {
            chrome.tabs.onUpdated.addListener(onUpdated)
            chrome.tabs.onRemoved.addListener(onRemoved)
        }
    }

    return {
        items,
        init,
        refetch,
    }
})
