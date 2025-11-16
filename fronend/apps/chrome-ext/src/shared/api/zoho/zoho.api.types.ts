import type { HTTP_METHOD } from '@/shared/api/api.types.ts'

export type RequestOptions = {
    url: string
    method: HTTP_METHOD
    headers?: Record<string, string>
    data?: Record<string, unknown>
}
