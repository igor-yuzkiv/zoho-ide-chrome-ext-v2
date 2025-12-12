import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ApiError, type MutationOptions } from '@zoho-ide/shared'
import { createUserRequest, type CreateUserRequestPayload, type IUser, UserQueryKeys } from '@zoho-ide/shared'
import { ref } from 'vue'

export const defaultCreateUserFormData = (): CreateUserRequestPayload => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

export function useCreateUser(options?: MutationOptions<IUser>) {
    const formData = ref<CreateUserRequestPayload>(defaultCreateUserFormData())
    const queryClient = useQueryClient()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, isPending } = useMutation<IUser, ApiError | Error, CreateUserRequestPayload>({
        mutationFn: (data) => createUserRequest(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.lists() }).catch(console.error)

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
        formErrors.value = {}
        mutate(formData.value)
    }

    return {
        formData,
        data,
        isSuccess,
        isPending,
        submit,
        formErrors,
    }
}
