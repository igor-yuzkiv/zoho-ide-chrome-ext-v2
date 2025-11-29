import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError } from '@zoho-ide/shared/api'
import {
    type IKnowledgeBaseItem,
    KnowledgeBaseQueryKeys,
    type SaveKbItemRequestPayload,
    updateKbItemRequest,
} from '@zoho-ide/knowledge-base/index.ts'
import { useToast } from '@zoho-ide/shared/composables'
import { type MaybeRefOrGetter, ref, toValue, watch } from 'vue'

const defaultCreateKbItemFormData = (): SaveKbItemRequestPayload => ({
    title: '',
    content: '',
})

export function useUpdateKbItem(kbItem: MaybeRefOrGetter<IKnowledgeBaseItem | undefined>) {
    const formData = ref<SaveKbItemRequestPayload>(defaultCreateKbItemFormData())
    const queryClient = useQueryClient()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, isPending } = useMutation<
        IKnowledgeBaseItem,
        ApiError | Error,
        { itemId: string; data: SaveKbItemRequestPayload }
    >({
        mutationFn: (payload) => {
            return updateKbItemRequest(payload.itemId, payload.data)
        },
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.items() }).catch(console.error)
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.item(id) }).catch(console.error)
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
        const itemId = toValue(kbItem)?.id
        if (itemId) {
            mutate({ itemId, data: formData.value })
        }
    }

    function resetFormData(partialData?: Partial<SaveKbItemRequestPayload>) {
        if (!partialData) {
            formData.value = defaultCreateKbItemFormData()
            return
        }

        formData.value = {
            ...defaultCreateKbItemFormData(),
            ...partialData,
        }
    }

    watch(() => toValue(kbItem), resetFormData, { immediate: true })

    return {
        formData,
        formErrors,
        submit,
        isPending,
        isSuccess,
        data,
    }
}
