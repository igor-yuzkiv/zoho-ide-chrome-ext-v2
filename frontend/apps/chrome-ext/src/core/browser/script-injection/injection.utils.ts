import type { InjectionResult } from '../browser.types.ts'
import type { Result } from '@zoho-ide/shared'

export function parseInjectionResult<T>(response: InjectionResult<T>): Result<T> {
    if (!response || !response?.length || !response[0]?.result) {
        return { ok: false, error: 'INVALID_RESPONSE' }
    }

    const result = response[0].result

    if (result.status >= 200 && result.status < 300) {
        return { ok: true, value: result.data }
    }

    return { ok: false, error: result?.message || 'REQUEST_FAILED' }
}
