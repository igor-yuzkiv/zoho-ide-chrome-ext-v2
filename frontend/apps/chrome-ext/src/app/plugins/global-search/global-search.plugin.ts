import { GlobalSearchModules } from '@/config/global-search.config.ts'
import type { App } from 'vue'
import { GlobalSearchPluginService } from '@/shared/libs/global-search'
import type { IGlobalSearchPluginOptions } from '@/shared/libs/global-search/lib/global-search.types.ts'

export function globalSearchPlugin(app: App) {
    app.use<Partial<IGlobalSearchPluginOptions>>(GlobalSearchPluginService, {
        modules: GlobalSearchModules,
    })
}
