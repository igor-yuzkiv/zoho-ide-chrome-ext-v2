import { createTagRequest } from '../api'
import { TagsQueryKeys } from '../tags.constants.ts'
import type { ITagEntity, SaveTagRequestPayload } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, useToast } from '@zoho-ide/shared'

export function useCreateTagMutation() {
    const queryClient = useQueryClient()
    const toast = useToast()

    const { mutate, mutateAsync, isPending } = useMutation<ITagEntity, ApiError | Error, SaveTagRequestPayload>({
        mutationFn: (data) => createTagRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TagsQueryKeys.lists() }).catch(console.error)
        },
        onError: (error) => {
            // TODO: refactor: remove toast from mutations error handling,
            //       add options- onError(error: Error, displayMessage: string)

            let errorMessage = 'An unexpected error occurred. Please try again.'
            if (error instanceof ApiError) {
                errorMessage = error.displayMessage
            }

            toast.error({ detail: errorMessage })
        },
    })

    return {
        mutate,
        mutateAsync,
        isPending,
    }
}
