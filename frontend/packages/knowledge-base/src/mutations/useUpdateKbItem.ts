import { updateKbItemRequest } from '../api'
import { defaultKbItemFormData, KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import { mapKbItemFormDataToRequestPayload } from '../knowledge-base.mappers.ts'
import type { IKnowledgeBaseItem, KbItemFormData } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, type MutationOptions } from '@zoho-ide/shared'
import { type MaybeRefOrGetter, ref, toValue, watch } from 'vue'

export function useUpdateKbItem(
    kbItem: MaybeRefOrGetter<IKnowledgeBaseItem | undefined>,
    options?: MutationOptions<IKnowledgeBaseItem>
) {
    const formData = ref<KbItemFormData>(defaultKbItemFormData())
    const queryClient = useQueryClient()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, isPending } = useMutation<
        IKnowledgeBaseItem,
        ApiError | Error,
        { itemId: string; data: KbItemFormData }
    >({
        mutationFn: (payload) => {
            return updateKbItemRequest(payload.itemId, mapKbItemFormDataToRequestPayload(payload.data))
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.items() }).catch(console.error)
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.item(response.id) }).catch(console.error)

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

    function submit() {
        const itemId = toValue(kbItem)?.id
        if (itemId) {
            mutate({ itemId, data: formData.value })
        }
    }

    function resetFormData(partialData?: Partial<KbItemFormData>) {
        if (!partialData) {
            formData.value = defaultKbItemFormData()
            return
        }

        formData.value = {
            ...defaultKbItemFormData(),
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
