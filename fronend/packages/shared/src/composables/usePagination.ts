import type { PaginationParams, PagingResponseMeta } from '../types'
import { computed, ref } from 'vue'

export function usePagination(initialParams: PaginationParams = { page: 1, perPage: 15 }) {
    const currentPage = ref<number>(initialParams.page)
    const perPage = ref<number>(initialParams.perPage)
    const total = ref<number>(0)
    const hasMore = ref<boolean>(false)
    const params = computed<PaginationParams>(() => ({
        page: currentPage.value,
        perPage: perPage.value,
    }))

    function setFromResponse(meta: PagingResponseMeta) {
        currentPage.value = meta.page
        perPage.value = meta.perPage
        total.value = meta.total
        hasMore.value = meta.hasMore
    }

    return {
        params,
        currentPage,
        perPage,
        total,
        hasMore,
        setFromResponse,
    }
}
