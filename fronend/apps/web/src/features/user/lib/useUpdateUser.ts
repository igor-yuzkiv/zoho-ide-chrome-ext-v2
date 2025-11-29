import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError } from '@zoho-ide/backend-api/api.error.ts'
import { updateUserRequest, type UpdateUserRequestPayload } from '@zoho-ide/backend-api/user'
import { type IUser, UserQueryKeys } from '@zoho-ide/shared/entities/user'
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
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.lists() }).catch(console.error)
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.details(id) }).catch(console.error)
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
