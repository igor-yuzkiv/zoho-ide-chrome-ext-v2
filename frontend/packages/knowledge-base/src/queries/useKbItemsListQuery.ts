import { searchKbItemsRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { IKnowledgeBaseItem } from '../types'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { debouncedRef } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { PagingResponse } from '@zoho-ide/shared/contracts'

const PER_PAGE = 50

export function useKbItemsListQuery() {
    const searchTerm = ref('')
    const searchTermDebounced = debouncedRef(searchTerm, 500)

    const { data, isPending, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<
        PagingResponse<IKnowledgeBaseItem[]>
    >({
        queryKey: [...KnowledgeBaseQueryKeys.items(), searchTermDebounced],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => {
            return searchKbItemsRequest(searchTermDebounced.value, { page: Number(pageParam), per_page: PER_PAGE })
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage?.meta?.has_more) return undefined
            return (lastPage.meta.page ?? 1) + 1
        },
    })

    const items = computed<IKnowledgeBaseItem[]>(() => {
        const pages = data.value?.pages ?? []
        return pages.flatMap((p) => p.data ?? [])
    })

    function loadMoreRecords() {
        if (!isFetchingNextPage.value && hasNextPage.value) {
            fetchNextPage()
        }
    }

    return {
        searchTerm,
        isPending,
        isFetching,
        isFetchingNextPage,

        items,

        loadMoreRecords,
        hasNextPage,
    }
}
