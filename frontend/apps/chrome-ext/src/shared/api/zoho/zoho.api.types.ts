export type RequestOptions = {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATH'
    headers?: Record<string, string>
    data?: Record<string, unknown>
}
