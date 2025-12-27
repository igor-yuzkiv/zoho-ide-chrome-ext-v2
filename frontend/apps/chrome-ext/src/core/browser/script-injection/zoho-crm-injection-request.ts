import type { InjectionRequestOptions, InjectionResult } from '../browser.types.ts'
import { parseInjectionResult } from './injection.utils.ts'
import type { Result } from '@zoho-ide/shared'

export async function zohoCrmInjectionRequest<T>(
    tabId: number,
    requestOptions: InjectionRequestOptions
): Promise<Result<T>> {
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
                const requestParams = {
                    method,
                    headers: {
                        Cookie: document.cookie,
                        'x-zcsrf-token': `crmcsrfparam=${cookieItems['CT_CSRF_TOKEN']}`,
                        ...headers,
                    },
                    body: options.data ? JSON.stringify(options.data || {}) : undefined,
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
