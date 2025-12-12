import type { Error } from './result.types.ts'

export type PaginationParams = {
    page: number
    perPage: number
}

export type PagingResponseMeta = {
    page: number
    perPage: number
    total: number
    hasMore: boolean
}

export type PagingResponse<T> = {
    ok: true
    data: T
    meta: PagingResponseMeta
}

export type PaginatedResult<T, E = string> = PagingResponse<T> | Error<E>
