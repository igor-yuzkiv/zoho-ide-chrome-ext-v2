import { GlobalSearchModules } from '@/config/global-search.config.ts'
import type { App } from 'vue'
import { GlobalSearchPluginService } from '@/modules/global-search'
import type { IGlobalSearchPluginOptions } from '@/modules/global-search/global-search.types.ts'

export function globalSearchPlugin(app: App) {
    app.use<Partial<IGlobalSearchPluginOptions>>(GlobalSearchPluginService, {
        modules: GlobalSearchModules,
    })
}
