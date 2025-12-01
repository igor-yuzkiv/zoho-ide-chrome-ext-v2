import { MaybeRefOrGetter } from '@vueuse/core'

export const TagsQueryKeys = {
    all: ['tags'],
    lists: () => [...TagsQueryKeys.all, 'list'],
    search: (term: MaybeRefOrGetter<string>, limit: MaybeRefOrGetter<number>) => [
        ...TagsQueryKeys.lists(),
        'search',
        term,
        limit,
    ],
}
