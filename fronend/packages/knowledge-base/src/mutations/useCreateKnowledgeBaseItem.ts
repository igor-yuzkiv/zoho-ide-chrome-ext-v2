import { createKbItemRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { IKnowledgeBaseItem, SaveKbItemRequestPayload } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, useToast } from '@zoho-ide/shared'
import { ref } from 'vue'

const defaultCreateKbItemFormData = (): SaveKbItemRequestPayload => ({
    title: '',
    content: '',
})

export function useCreateKnowledgeBaseItem() {
    const formData = ref<SaveKbItemRequestPayload>(defaultCreateKbItemFormData())
    const queryClient = useQueryClient()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, mutateAsync, isPending } = useMutation<
        IKnowledgeBaseItem,
        ApiError | Error,
        SaveKbItemRequestPayload
    >({
        mutationFn: (data) => createKbItemRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.items() }).catch(console.error)
        },
        onError: (error) => {
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

    function submit() {
        formErrors.value = {}
        mutate(formData.value)
    }

    async function submitAsync() {
        formErrors.value = {}
        return await mutateAsync(formData.value)
    }

    return {
        formData,
        submit,
        submitAsync,
        isPending,
        isSuccess,
        data,
        formErrors,
    }
}
