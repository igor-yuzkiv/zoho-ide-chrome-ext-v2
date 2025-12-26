//TODO: move global search to separate package
export { GlobalSearchPluginService } from './global-search-plugin-service.ts'
export { default as GlobalSearchDialog } from './ui/GlobalSearchDialog.vue'
export { default as SearchResultsList } from './ui/SearchResultsList.vue'

export { useGlobalSearch } from '@/modules/global-search/composables/useGlobalSearch.ts'
export { useGlobalSearchEngine } from '@/modules/global-search/composables/useGlobalSearchEngine.ts'
