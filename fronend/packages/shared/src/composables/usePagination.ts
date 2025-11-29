import type { PagingParams, PagingResponseMeta } from '../types/pagination.types.ts'
import { computed, ref } from 'vue'

export function usePagination(initialParams: PagingParams = { page: 1, per_page: 15 }) {
    const currentPage = ref<number>(initialParams.page)
    const perPage = ref<number>(initialParams.per_page)
    const total = ref<number>(0)
    const hasMore = ref<boolean>(false)
    const params = computed<PagingParams>(() => ({
        page: currentPage.value,
        per_page: perPage.value,
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
