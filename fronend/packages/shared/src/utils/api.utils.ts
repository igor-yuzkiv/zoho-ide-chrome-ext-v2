export function buildQueryParams(
    params: Record<string, string | number | undefined | null>
): Record<string, string | number> {
    const queryParams: Record<string, string | number> = {}

    for (const key in params) {
        const value = params[key]
        if (value !== undefined && value !== null && !(typeof value === 'string' && value.trim() === '')) {
            queryParams[key] = value
        }
    }

    return queryParams
}
