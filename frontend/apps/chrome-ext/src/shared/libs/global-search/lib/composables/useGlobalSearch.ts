import { inject } from 'vue'
import { useGlobalSearchSettings } from '@/shared/libs/global-search/lib/composables/useGlobalSearchSettings.ts'
import { globalSearchIndex } from '@/shared/libs/global-search/lib/global-search-index.ts'
import { GlobalSearchPluginSymbol } from '@/shared/libs/global-search/lib/global-search.constants.ts'
import type {
    GlobalSearchOpenParams,
    IGlobalSearchService,
} from '@/shared/libs/global-search/lib/global-search.types.ts'

export function useGlobalSearch() {
    const service = inject<IGlobalSearchService>(GlobalSearchPluginSymbol)
    const settings = useGlobalSearchSettings()

    async function bootstrap(context?: Record<string, unknown>) {
        if (!settings.modules.value.length) {
            console.warn('No Global Search modules to index.')
            return
        }

        globalSearchIndex.clear()

        for (const module of settings.modules.value) {
            const documents = await module.provideIndexDocuments(context)
            if (!documents.length) {
                continue
            }

            documents.forEach((doc) => globalSearchIndex.add(doc))
        }
    }

    function open(params?: GlobalSearchOpenParams) {
        if (!service) {
            console.warn('GlobalSearchService is not installed.')
            return
        }

        service.open(params)
    }

    function close() {
        if (!service) {
            console.warn('GlobalSearchService is not installed.')
            return
        }

        service.close()
    }

    return { open, close, bootstrap }
}
