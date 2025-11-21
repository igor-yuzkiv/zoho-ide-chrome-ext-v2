import { ApiError } from "./api.error.ts";

export const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred. Please try again.';

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
    }
];

export function getStatusCodeMessage(status: number): string {
    const statusMessage = STATUS_CODE_MESSAGES.find(range => status >= range.min && status <= range.max);

    return statusMessage ? statusMessage.message : DEFAULT_ERROR_MESSAGE;
}

export function isApiError(error: unknown): boolean {
    return error instanceof ApiError;
}
