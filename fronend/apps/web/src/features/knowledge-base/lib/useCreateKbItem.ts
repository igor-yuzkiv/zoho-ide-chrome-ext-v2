import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError } from '@zoho-ide/backend-api/api.error.ts'
import { createKbItemRequest, type SaveKbItemRequestPayload } from '@zoho-ide/backend-api/knowledge-base'
import { type IKnowledgeBaseItem, KnowledgeBaseQueryKeys } from '@zoho-ide/shared/entities/knowledge-base'
import { useToast } from '@zoho-ide/ui-kit/composables'
import { ref } from 'vue'

const defaultCreateKbItemFormData = (): SaveKbItemRequestPayload => ({
    title: '',
    content: '',
})

export function useCreateKbItem() {
    const formData = ref<SaveKbItemRequestPayload>(defaultCreateKbItemFormData())
    const queryClient = useQueryClient()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, isPending } = useMutation<
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

    return {
        formData,
        submit,
        isPending,
        isSuccess,
        data,
        formErrors,
    }
}
