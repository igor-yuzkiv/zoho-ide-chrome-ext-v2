import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError } from '@zoho-ide/backend-api/api.error.ts'
import { deleteUserByIdRequest, type DeleteUserByIdResponse, UserQueryKeys } from '@zoho-ide/backend-api/user'
import { useConfirm, useToast } from '@zoho-ide/ui-kit/composables'
import { type MaybeRefOrGetter, toValue } from 'vue'

export function useDeleteUser() {
    const queryClient = useQueryClient()
    const confirm = useConfirm()
    const toast = useToast()

    const { mutateAsync, isPending } = useMutation<DeleteUserByIdResponse, ApiError | Error, { userId: string }>({
        mutationFn: (payload) => deleteUserByIdRequest(payload.userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.lists() }).catch(console.error)
        },
        onError: (error) => {
            let errorMessage = 'Failed to delete user. Please try again later.'
            if (error instanceof ApiError) {
                errorMessage = error.displayMessage
            }

            toast.error({ detail: errorMessage })
        },
    })

    async function removeUser(userId: MaybeRefOrGetter<string>): Promise<boolean> {
        return await mutateAsync({ userId: toValue(userId) }).then(r => r.status)
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
