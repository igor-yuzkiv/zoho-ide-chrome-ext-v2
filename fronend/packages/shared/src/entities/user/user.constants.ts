import type { MaybeRefOrGetter } from 'vue'

export const UserQueryKeys = {
    all: ['users'],
    lists: () => [...UserQueryKeys.all, 'list'],
    details: (userId: MaybeRefOrGetter) => [...UserQueryKeys.all, 'detail', userId],
}

export const UserEntityType = 'user'

export const TOKEN_LOCAL_STORAGE_KEY = 'backend_api_auth_token'