import { deleteKbItemRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { DeleteKbItemByIdResponse } from '../types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'
import { useConfirm } from '@zoho-ide/ui-kit'
import { ApiError } from '@zoho-ide/shared/api'
import type { MutationOptions } from '@zoho-ide/shared/contracts'

export function useDeleteKbItem(options?: MutationOptions<DeleteKbItemByIdResponse>) {
    const queryClient = useQueryClient()
    const confirm = useConfirm()

    const { mutateAsync, isPending } = useMutation<DeleteKbItemByIdResponse, ApiError | Error, string>({
        mutationFn: (itemId) => deleteKbItemRequest(itemId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: KnowledgeBaseQueryKeys.items() }).catch(console.error)

            if (options?.onSuccess) {
                options.onSuccess(response)
            }
        },
        onError: (error) => {
            let errorMessage = 'Failed to delete the knowledge base item.'
            if (error instanceof ApiError) {
                errorMessage = error.displayMessage
            }

            if (options?.onError) {
                options.onError(errorMessage, error)
            } else {
                console.warn('Unhandled mutation error:', errorMessage, error)
            }
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
