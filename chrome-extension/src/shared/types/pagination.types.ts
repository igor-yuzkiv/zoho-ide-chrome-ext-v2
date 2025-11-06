import type { Error } from './result.types.ts'

export type PaginationParams = {
    page: number
    perPage: number
}

type SuccessPagingResult<T> = {
    ok: true
    value: T
    meta: {
        count: number
        page: number
        perPage: number
        hasMore: boolean
    }
}

export type PaginatedResult<T, E = string> = SuccessPagingResult<T> | Error<E>
