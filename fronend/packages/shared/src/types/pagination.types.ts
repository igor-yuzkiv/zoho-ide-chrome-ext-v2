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
    data: T
    meta: PagingResponseMeta
}

export type SuccessPaginatedResult<T> = PagingResponse<T> & { ok: true }

export type PaginatedResult<T, E = string> = SuccessPaginatedResult<T> | Error<E>
