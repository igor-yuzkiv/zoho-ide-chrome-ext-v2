import {
    GLOBAL_SEARCH_DEFAULT_OPTIONS,
    GlobalSearchPluginSettingsSymbol,
    GlobalSearchPluginSymbol,
} from './global-search.constants.ts'
import type {
    GlobalSearchEventTypes,
    GlobalSearchOpenParams,
    IGlobalSearchPluginOptions,
    IGlobalSearchService,
    OpenGlobalSearchHandler,
} from './global-search.types.ts'
import mitt from 'mitt'
import { type App } from 'vue'

const emitter = mitt<GlobalSearchEventTypes>()

export const GlobalSearchPluginService = {
    install(app: App, options: Partial<IGlobalSearchPluginOptions>) {
        app.provide<IGlobalSearchService>(GlobalSearchPluginSymbol, {
            open: (params?: GlobalSearchOpenParams) => emitter.emit('open', params),
            close: () => emitter.emit('close'),
            onOpen: (handler: OpenGlobalSearchHandler) => emitter.on('open', handler),
            onClose: (handler: () => void) => emitter.on('close', handler),
        })

        app.provide(GlobalSearchPluginSettingsSymbol, { ...GLOBAL_SEARCH_DEFAULT_OPTIONS, ...options })
    },
}
