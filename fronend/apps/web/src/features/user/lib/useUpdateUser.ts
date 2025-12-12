import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, type MutationOptions } from '@zoho-ide/shared'
import { type IUser, updateUserRequest, type UpdateUserRequestPayload, UserQueryKeys } from '@zoho-ide/shared'
import { type MaybeRefOrGetter, ref, toValue, watch } from 'vue'

export const defaultUpdateUserFormData = (): UpdateUserRequestPayload => ({ name: '', email: '' })

export function useUpdateUser(user: MaybeRefOrGetter<IUser | undefined>, options?: MutationOptions<IUser>) {
    const formData = ref<UpdateUserRequestPayload>(defaultUpdateUserFormData())
    const queryClient = useQueryClient()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, isPending } = useMutation<
        IUser,
        ApiError | Error,
        { userId: string; data: UpdateUserRequestPayload }
    >({
        mutationFn: (payload) => {
            return updateUserRequest(payload.userId, payload.data)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.lists() }).catch(console.error)
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.details(response.id) }).catch(console.error)

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
        const userId = toValue(user)?.id
        if (userId) {
            mutate({ userId, data: formData.value })
        }
    }

    function resetFormData(partialData?: Partial<UpdateUserRequestPayload>) {
        const defaultData = defaultUpdateUserFormData()
        formData.value = {
            name: partialData?.name ?? defaultData.name,
            email: partialData?.email ?? defaultData.email,
        }
    }

    watch(() => toValue(user), resetFormData, { immediate: true })
    return {
        formData,
        formErrors,
        submit,
        isPending,
        isSuccess,
        data,
    }
}
