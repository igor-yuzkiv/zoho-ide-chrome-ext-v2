import { createKbItemFromTemplateRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { CreateKbItemFromTemplateRequestPayload, IKnowledgeBaseItem } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, useToast } from '@zoho-ide/shared'
import { ref } from 'vue'

export function useCreateKbItemFromTemplate() {
    const queryClient = useQueryClient()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, mutateAsync, isPending } = useMutation<
        IKnowledgeBaseItem,
        ApiError | Error,
        { templateId: string; payload: CreateKbItemFromTemplateRequestPayload }
    >({
        mutationFn: (data) => createKbItemFromTemplateRequest(data.templateId, data.payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.items() }).catch(console.error)
        },
        onError: (error) => {
            // TODO: refactor: remove toast from mutations error handling,
            //       add options- onError(error: Error, displayMessage: string)

            let errorMessage = 'An unexpected error occurred. Please try again.'

            if (error instanceof ApiError) {
                errorMessage = error.displayMessage

                if (error.isValidationError) {
                    formErrors.value = error.getValidationErrors()
                }
            }

            toast.error({ detail: errorMessage })
        },
    })

    return {
        data,
        isSuccess,
        mutate,
        mutateAsync,
        isPending,
    }
}
