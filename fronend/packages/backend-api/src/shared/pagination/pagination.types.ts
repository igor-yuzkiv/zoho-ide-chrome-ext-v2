export type PagingParams = {
    page: number;
    per_page: number;
};

export type PagingResponseMeta = {
    page: number;
    perPage: number;
    total: number;
    hasMore: boolean;
};

export type PagingResponse<T> = {
    data: T[];
    meta: PagingResponseMeta;
};
