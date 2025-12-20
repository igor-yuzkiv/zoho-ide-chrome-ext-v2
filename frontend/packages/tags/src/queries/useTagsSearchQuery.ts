import { searchTagsRequest } from '../api'
import { TagsQueryKeys } from '../tags.constants.ts'
import { ITagEntity } from '../types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, refDebounced } from '@vueuse/core'
import { ref, toValue } from 'vue'

export function useTagsSearchQuery(limit: MaybeRefOrGetter<number> = 10) {
    const searchTerm = ref('')
    const searchTermDebounced = refDebounced(searchTerm, 500)

    const { isPending, isFetching, data } = useQuery<ITagEntity[]>({
        queryKey: TagsQueryKeys.search(searchTermDebounced, limit),
        queryFn: () => {
            return searchTagsRequest({
                search_term: searchTermDebounced.value,
                limit: toValue(limit),
            })
        },
        placeholderData: keepPreviousData,
        initialData: [],
    })

    return {
        searchTerm,
        searchTermDebounced,
        isPending,
        isFetching,
        data,
    }
}
