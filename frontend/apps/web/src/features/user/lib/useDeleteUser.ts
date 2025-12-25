import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, type MutationOptions } from '@zoho-ide/shared'
import { deleteUserByIdRequest, type DeleteUserByIdResponse, UserQueryKeys } from '@zoho-ide/shared'
import { type MaybeRefOrGetter, toValue } from 'vue'
import { useConfirm } from '@zoho-ide/ui-kit'

export function useDeleteUser(options?: MutationOptions<DeleteUserByIdResponse>) {
    const queryClient = useQueryClient()
    const confirm = useConfirm()

    const { mutateAsync, isPending } = useMutation<DeleteUserByIdResponse, ApiError | Error, { userId: string }>({
        mutationFn: (payload) => deleteUserByIdRequest(payload.userId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.lists() }).catch(console.error)

            if (options?.onSuccess) {
                options.onSuccess(response)
            }
        },
        onError: (error) => {
            let errorMessage = 'Failed to delete user. Please try again later.'
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

    async function removeUser(userId: MaybeRefOrGetter<string>): Promise<boolean> {
        return await mutateAsync({ userId: toValue(userId) }).then((r) => r.status)
    }

    async function removeUserWithConfirmation(
        userId: MaybeRefOrGetter<string>,
        userName: MaybeRefOrGetter<string>
    ): Promise<boolean> {
        const isConfirmed = await confirm.requireAsync({
            message: `Are you sure you want to delete the user "${toValue(userName)}"? This action cannot be undone.`,
        })

        if (isConfirmed) {
            return await removeUser(toValue(userId))
        }

        return false
    }

    return {
        isPending,
        removeUser,
        removeUserWithConfirmation,
    }
}
