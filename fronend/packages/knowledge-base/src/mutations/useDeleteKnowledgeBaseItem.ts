import { deleteKbItemRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { DeleteKbItemByIdResponse } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, useConfirm, useToast } from '@zoho-ide/shared'
import { MaybeRefOrGetter, toValue } from 'vue'

export function useDeleteKnowledgeBaseItem() {
    const queryClient = useQueryClient()
    const confirm = useConfirm()
    const toast = useToast()

    const { mutateAsync, isPending } = useMutation<DeleteKbItemByIdResponse, ApiError | Error, string>({
        mutationFn: (itemId) => deleteKbItemRequest(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.items() }).catch(console.error)
        },
        onError: (error) => {
            let errorMessage = 'Failed to delete the knowledge base item.'
            if (error instanceof ApiError) {
                errorMessage = error.displayMessage
            }

            toast.error({ detail: errorMessage })
        },
    })

    async function remove(itemId: MaybeRefOrGetter<string>): Promise<boolean> {
        return await mutateAsync(toValue(itemId)).then((r) => r.status)
    }

    async function removeWithConfirmation(
        itemId: MaybeRefOrGetter<string>,
        articleName: MaybeRefOrGetter<string>
    ): Promise<boolean> {
        const isConfirmed = await confirm.requireAsync({
            message: `Are you sure you want to delete the article "${toValue(articleName)}"? This action cannot be undone.`,
        })

        if (isConfirmed) {
            return await remove(itemId)
        }

        return false
    }

    return {
        isPending,
        remove,
        removeWithConfirmation,
    }
}
