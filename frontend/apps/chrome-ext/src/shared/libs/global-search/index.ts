//TODO: move global search to separate package
export { GlobalSearchPluginService } from './lib/global-search-plugin-service.ts'
export { default as GlobalSearchDialog } from './ui/GlobalSearchDialog.vue'
export { default as SearchResultsList } from './ui/SearchResultsList.vue'

export { useGlobalSearch } from '@/shared/libs/global-search/lib/composables/useGlobalSearch.ts'
export { useGlobalSearchEngine } from '@/shared/libs/global-search/lib/composables/useGlobalSearchEngine.ts'
