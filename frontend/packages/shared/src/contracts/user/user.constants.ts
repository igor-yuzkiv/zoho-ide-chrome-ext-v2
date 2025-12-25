import type { MaybeRefOrGetter } from 'vue'

export const UserQueryKeys = {
    all: ['users'],
    lists: () => [...UserQueryKeys.all, 'list'],
    details: (userId: MaybeRefOrGetter) => [...UserQueryKeys.all, 'detail', userId],
}
