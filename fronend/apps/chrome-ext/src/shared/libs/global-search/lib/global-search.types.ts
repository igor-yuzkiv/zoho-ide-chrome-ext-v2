import type { RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'

export interface IGlobalSearchService {
    open: (params?: GlobalSearchOpenParams) => void
    close: () => void
    onOpen: (handler: OpenGlobalSearchHandler) => void
    onClose: (handler: () => void) => void
}

export interface IGlobalSearchPluginOptions extends Record<string, unknown> {
    shortcutKeys: string[] // e.g.: ['k', 'K'] - Opens search on Ctrl+K or Cmd+K
    modules: GlobalSearchModule[]
}

export type GlobalSearchOpenParams = {
    query?: string
    extraOptions?: Record<string, unknown>
}

export type OpenGlobalSearchHandler = (params?: GlobalSearchOpenParams) => void

export type GlobalSearchEventTypes = {
    open: GlobalSearchOpenParams | undefined
    close: void
}

export type GlobalSearchModule = {
    name: string
    icon: string
    provideIndexDocuments: GlobalSearchDocumentsProvider
    getNavigationRoute?: (document: GlobalSearchDocument) => RouteLocationRaw | undefined
    previewComponent?: string | Component
    //TODO: handle search result clicks, preview component
}

export type GlobalSearchDocumentsProvider = (context?: Record<string, unknown>) => Promise<GlobalSearchDocument[]>

export type GlobalSearchDocument = {
    id: string
    module: string
    title: string
    content: string
}

export type GlobalSearchFields = 'title' | 'content'