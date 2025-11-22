import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError } from '@zoho-ide/backend-api/api.error.ts'
import { type IUser, updateUserRequest, type UpdateUserRequestPayload, UserQueryKeys } from '@zoho-ide/backend-api/user'
import { useToast } from '@zoho-ide/ui-kit/composables'
import { type MaybeRefOrGetter, ref, toValue, watch } from 'vue'

export const defaultUpdateUserFormData = (): UpdateUserRequestPayload => ({ name: '', email: '' })

export function useUpdateUser(user: MaybeRefOrGetter<IUser | undefined>) {
    const formData = ref<UpdateUserRequestPayload>(defaultUpdateUserFormData())
    const queryClient = useQueryClient()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, isPending } = useMutation<
        IUser,
        ApiError | Error,
        { userId: string; data: UpdateUserRequestPayload }
    >({
        mutationFn: (payload) => {
            return updateUserRequest(payload.userId, payload.data)
        },
        onSuccess: () => {
            // TODO: invalidate only the specific user keys
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.all }).catch(console.error)
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
        const userId = toValue(user)?.id
        if (userId) {
            mutate({ userId, data: formData.value })
        }
    }

    watch(
        () => toValue(user),
        (newValue) => {
            if (newValue) {
                formData.value = {
                    name: newValue.name,
                    email: newValue.email,
                }
            }
        }
    )

    return {
        formData,
        formErrors,
        submit,
        isPending,
        isSuccess,
        data,
    }
}
