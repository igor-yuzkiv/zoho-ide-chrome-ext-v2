import { computed, inject } from 'vue'
import {
    GLOBAL_SEARCH_DEFAULT_OPTIONS,
    GlobalSearchPluginSettingsSymbol,
} from '@/shared/libs/global-search/lib/global-search.constants.ts'
import type {
    GlobalSearchModule,
    IGlobalSearchPluginOptions,
} from '@/shared/libs/global-search/lib/global-search.types.ts'

export function useGlobalSearchSettings() {
    const settings = inject<IGlobalSearchPluginOptions>(GlobalSearchPluginSettingsSymbol)
    const modules = computed(() => settings?.modules || [])
    const shortcutKeys = computed(() => settings?.shortcutKeys || GLOBAL_SEARCH_DEFAULT_OPTIONS.shortcutKeys)

    const modulesByNameMap = computed<Record<string, GlobalSearchModule>>(() => {
        return Object.fromEntries(
            modules.value.map((module) => [module.name, module])
        );
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
