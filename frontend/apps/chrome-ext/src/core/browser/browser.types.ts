export type BrowserTab = chrome.tabs.Tab

export type InjectionRequestOptions = {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATH'
    headers?: Record<string, string>
    data?: Record<string, unknown>
}

export type InjectionRequestResponse<T> = {
    status: number
    message?: string
    data: T
}

export type InjectionResult<T> = chrome.scripting.InjectionResult<InjectionRequestResponse<T>>[]
