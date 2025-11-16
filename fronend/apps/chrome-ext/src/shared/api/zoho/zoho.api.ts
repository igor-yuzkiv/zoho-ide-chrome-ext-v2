import type { RequestOptions } from '@/shared/api/zoho/zoho.api.types.ts'
import type { Result } from '@/shared/types/result.types.ts'

type RequestParams = {
    method: string
    headers?: Record<string, string>
    body?: string
}

type InjectionResponse<T> = {
    status: number
    message?: string
    data: T
}

type InjectionResult<T> = chrome.scripting.InjectionResult<InjectionResponse<T>>[]

function parseInjectionResult<T>(response: InjectionResult<T>): Result<T> {
    if (!response || !response?.length || !response[0]?.result) {
        return { ok: false, error: 'INVALID_RESPONSE' }
    }

    const result = response[0].result

    if (result.status >= 200 && result.status < 300) {
        return { ok: true, value: result.data }
    }

    return { ok: false, error: result?.message || 'REQUEST_FAILED' }
}

export async function zohoCrmRequest<T>(tabId: number, requestOptions: RequestOptions): Promise<Result<T>> {
    if (!requestOptions.url.startsWith('http') && !requestOptions.url.startsWith('/')) {
        requestOptions.url = `/${requestOptions.url}`
    }

    const response = (await chrome.scripting.executeScript({
        target: { tabId },
        args: [requestOptions],
        func: async (options) => {
            try {
                const { url, method, headers } = options || { headers: {} }

                const cookieItems = Object.fromEntries(
                    document.cookie
                        .split(';')
                        .map((item) => item.trim().split('='))
                        .filter((item) => item.length === 2)
                )

                const requestUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`
                const requestParams: RequestParams = {
                    method,
                    headers: {
                        Cookie: document.cookie,
                        'x-zcsrf-token': `crmcsrfparam=${cookieItems['CT_CSRF_TOKEN']}`,
                        ...headers,
                    },
                }

                if (options.data) {
                    requestParams['body'] = JSON.stringify(options.data || {})
                }

                const response = await fetch(requestUrl, requestParams)

                const data = await response.json()
                return {
                    status: response.status,
                    data: data,
                    message: data?.message || response.statusText,
                }
            } catch (e) {
                return {
                    status: 500,
                    message: e instanceof Error ? e.message : 'Unknown error occurred',
                }
            }
        },
    })) as InjectionResult<T>

    return parseInjectionResult<T>(response)
}
