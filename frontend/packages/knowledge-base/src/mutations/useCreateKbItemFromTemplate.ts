import { createKbItemFromTemplateRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { CreateKbItemFromTemplateRequestPayload, IKnowledgeBaseItem } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { ApiError } from '@zoho-ide/shared/api'
import type { MutationOptions } from '@zoho-ide/shared/contracts'

export function useCreateKbItemFromTemplate(options?: MutationOptions<IKnowledgeBaseItem>) {
    const queryClient = useQueryClient()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, mutateAsync, isPending } = useMutation<
        IKnowledgeBaseItem,
        ApiError | Error,
        { templateId: string; payload: CreateKbItemFromTemplateRequestPayload }
    >({
        mutationFn: (data) => createKbItemFromTemplateRequest(data.templateId, data.payload),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.items() }).catch(console.error)

            if (options?.onSuccess) {
                options.onSuccess(response)
            }
        },
        onError: (error) => {
            let errorMessage = 'An unexpected error occurred. Please try again.'

            if (error instanceof ApiError) {
                errorMessage = error.displayMessage

                if (error.isValidationError) {
                    formErrors.value = error.getValidationErrors()
                }
            }

            if (options?.onError) {
                options.onError(errorMessage, error)
            } else {
                console.warn('Unhandled mutation error:', errorMessage, error)
            }
        },
    })

    return {
        data,
        isSuccess,
        mutate,
        mutateAsync,
        isPending,
        formErrors,
    }
}
