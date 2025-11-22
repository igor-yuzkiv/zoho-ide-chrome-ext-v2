import type { SortParams } from './sort.types.ts'
import { computed, ref } from 'vue'

export function useSortParams() {
    const sortBy = ref<string | null>(null)
    const sortDesc = ref<boolean>(false)

    const queryParams = computed<SortParams | undefined>(() => {
        if (!sortBy.value) {
            return
        }

        return {
            sort_by: sortBy.value || '',
            sort_order: sortDesc.value ? 'desc' : 'asc',
        }
    })

    return {
        sortBy,
        sortDesc,
        queryParams,
    }
}
