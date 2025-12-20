import { useQuery } from '@tanstack/vue-query'
import { refDebounced } from '@vueuse/core'
import { ref } from 'vue'
import { globalSearchIndex } from '@/shared/libs/global-search/lib/global-search-index.ts'
import type { GlobalSearchDocument, GlobalSearchFields } from '@/shared/libs/global-search/lib/global-search.types.ts'

async function handleSearch(query: string, searchByField: GlobalSearchFields): Promise<GlobalSearchDocument[]> {
    const searchResult = await globalSearchIndex.searchAsync(query, {
        enrich: true,
        field: searchByField,
    })

    if (!searchResult.length || !searchResult[0]?.result?.length) {
        return []
    }

    return searchResult[0]?.result.map((r) => r.doc).filter((r) => !!r)
}

export function useGlobalSearchEngine() {
    const searchQuery = ref('')
    const searchQueryDebounced = refDebounced(searchQuery)
    const searchByField = ref<GlobalSearchFields>('title')

    const { data } = useQuery<GlobalSearchDocument[]>({
        queryKey: ['global-search', searchQueryDebounced, searchByField],
        queryFn: () => handleSearch(searchQueryDebounced.value, searchByField.value),
    })

    return {
        data,
        searchQuery,
        searchByField,
    }
}
