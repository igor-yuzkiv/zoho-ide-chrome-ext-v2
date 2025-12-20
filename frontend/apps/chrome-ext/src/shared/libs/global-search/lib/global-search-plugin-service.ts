import mitt from 'mitt'
import { type App } from 'vue'
import {
    GLOBAL_SEARCH_DEFAULT_OPTIONS,
    GlobalSearchPluginSettingsSymbol,
    GlobalSearchPluginSymbol,
} from '@/shared/libs/global-search/lib/global-search.constants.ts'
import type {
    GlobalSearchEventTypes,
    GlobalSearchOpenParams,
    IGlobalSearchPluginOptions,
    IGlobalSearchService,
    OpenGlobalSearchHandler,
} from '@/shared/libs/global-search/lib/global-search.types.ts'

const emitter = mitt<GlobalSearchEventTypes>()

export const GlobalSearchPluginService = {
    install(app: App, options: Partial<IGlobalSearchPluginOptions>) {
        app.provide<IGlobalSearchService>(GlobalSearchPluginSymbol, {
            open: (params?: GlobalSearchOpenParams) => emitter.emit('open', params),
            close: () => emitter.emit('close'),
            onOpen: (handler: OpenGlobalSearchHandler) => emitter.on('open', handler),
            onClose: (handler: () => void) => emitter.on('close', handler),
        })

        app.provide<IGlobalSearchPluginOptions>(GlobalSearchPluginSettingsSymbol, {
            ...GLOBAL_SEARCH_DEFAULT_OPTIONS,
            ...options,
        })
    },
}
