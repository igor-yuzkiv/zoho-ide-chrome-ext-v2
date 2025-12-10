import { createKbItemRequest } from '../api'
import { defaultKbItemFormData, KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import { mapKbItemFormDataToRequestPayload } from '../knowledge-base.mappers.ts'
import type { IKnowledgeBaseItem, KbItemFormData } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, useToast } from '@zoho-ide/shared'
import { ref } from 'vue'

export function useCreateKbItem() {
    const formData = ref<KbItemFormData>(defaultKbItemFormData())
    const queryClient = useQueryClient()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, mutateAsync, isPending } = useMutation<
        IKnowledgeBaseItem,
        ApiError | Error,
        KbItemFormData
    >({
        mutationFn: (data) => createKbItemRequest(mapKbItemFormDataToRequestPayload(data)),
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
