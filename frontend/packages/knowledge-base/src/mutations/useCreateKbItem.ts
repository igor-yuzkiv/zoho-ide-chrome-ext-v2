import { createKbItemRequest } from '../api'
import { defaultKbItemFormData, KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import { mapKbItemFormDataToRequestPayload } from '../knowledge-base.mappers.ts'
import type { IKnowledgeBaseItem, KbItemFormData } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { ApiError } from '@zoho-ide/shared/api'
import type { MutationOptions } from '@zoho-ide/shared/contracts'

export function useCreateKbItem(options?: MutationOptions<IKnowledgeBaseItem>) {
    const formData = ref<KbItemFormData>(defaultKbItemFormData())
    const queryClient = useQueryClient()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, mutateAsync, isPending } = useMutation<
        IKnowledgeBaseItem,
        ApiError | Error,
        KbItemFormData
    >({
        mutationFn: (data) => createKbItemRequest(mapKbItemFormDataToRequestPayload(data)),
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

    function resetFormData() {
        formData.value = defaultKbItemFormData()
    }

    async function submitFormData() {
        formErrors.value = {}
        return await mutateAsync(formData.value)
    }

    return {
        data,
        isPending,
        isSuccess,
        mutate,
        mutateAsync,

        formData,
        formErrors,
        resetFormData,
        submitFormData,
    }
}
