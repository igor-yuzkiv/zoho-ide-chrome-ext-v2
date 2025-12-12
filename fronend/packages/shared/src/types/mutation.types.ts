import { ApiError } from '../api'

export type MutationOptions<TData, TError = ApiError | Error> = {
    onSuccess?: (data: TData) => void
    onError?: (displayMessage: string, error: TError) => void
}
