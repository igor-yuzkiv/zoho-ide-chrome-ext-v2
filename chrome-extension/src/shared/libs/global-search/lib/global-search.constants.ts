import type { IGlobalSearchPluginOptions } from './global-search.types.ts'

export const GlobalSearchPluginSymbol = Symbol('GlobalSearchPlugin')
export const GlobalSearchPluginSettingsSymbol = Symbol('GlobalSearchPluginSettings')

export const GLOBAL_SEARCH_DEFAULT_OPTIONS: IGlobalSearchPluginOptions = {
    shortcutKeys: ['k', 'K'],
    modules: [],
}
