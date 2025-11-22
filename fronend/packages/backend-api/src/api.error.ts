import type { AxiosError } from 'axios'

export const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred. Please try again.'

export const STATUS_CODE_MESSAGES = [
    {
        min: 400,
        max: 499,
        message: 'A client error occurred. Please check your request and try again.',
    },
    {
        min: 500,
        max: 599,
        message: 'A server error occurred. Please try again later.',
    },
    {
        min: 0,
        max: 0,
        message: 'Network error. Please check your internet connection and try again.',
    },
]

export function getStatusCodeMessage(status: number): string {
    const statusMessage = STATUS_CODE_MESSAGES.find((range) => status >= range.min && status <= range.max)

    return statusMessage ? statusMessage.message : DEFAULT_ERROR_MESSAGE
}

export class ApiError extends Error {
    error: AxiosError

    constructor(error: AxiosError) {
        super()
        this.error = error
        this.name = 'ApiError'
    }

    get status(): number {
        return this.error?.response?.status || 500
    }

    get displayMessage(): string {
        if (this.isValidationError) {
            const data = this.getData<{ message: string }>()
            return data?.message || getStatusCodeMessage(422)
        }

        return getStatusCodeMessage(this.status)
    }

    get isValidationError() {
        return this.status === 422 && this.error.response?.data
    }

    getData<T = unknown>(): T | undefined {
        if (!this.error.response) {
            return
        }

        return this.error.response.data as T
    }

    getValidationErrors(): Record<string, string[]> {
        const data = this.getData<{ errors: Record<string, string[]> }>()
        if (this.isValidationError && data?.errors) {
            return data.errors
        }

        return {}
    }
}
