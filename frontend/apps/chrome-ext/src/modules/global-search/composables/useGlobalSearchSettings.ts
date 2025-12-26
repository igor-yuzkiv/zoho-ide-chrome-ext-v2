import {
    GLOBAL_SEARCH_DEFAULT_OPTIONS,
    GlobalSearchPluginSettingsSymbol,
} from '@/modules/global-search/global-search.constants.ts'
import type { GlobalSearchModule, IGlobalSearchPluginOptions } from '@/modules/global-search/global-search.types.ts'
import { computed, inject } from 'vue'

export function useGlobalSearchSettings() {
    const settings = inject<IGlobalSearchPluginOptions>(GlobalSearchPluginSettingsSymbol)
    const modules = computed(() => settings?.modules || [])
    const shortcutKeys = computed(() => settings?.shortcutKeys || GLOBAL_SEARCH_DEFAULT_OPTIONS.shortcutKeys)

    const modulesByNameMap = computed<Record<string, GlobalSearchModule>>(() => {
        return Object.fromEntries(modules.value.map((module) => [module.name, module]))
    })

    function findModuleByName(name: string): GlobalSearchModule | undefined {
        return modulesByNameMap.value[name]
    }

    return {
        settings,
        modules,
        modulesByNameMap,
        shortcutKeys,
        findModuleByName,
    }
}
