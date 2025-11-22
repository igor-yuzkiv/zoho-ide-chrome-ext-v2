import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createUserRequest, type CreateUserRequestPayload, type IUser, UserQueryKeys } from '@zoho-ide/backend-api/user';
import { useToast } from '@zoho-ide/ui-kit/composables'
import { ref } from 'vue'
import { ApiError } from '@zoho-ide/backend-api/index.ts'

export const defaultCreateUserFormData = (): CreateUserRequestPayload => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

export function useCreateUser() {
    const formData = ref<CreateUserRequestPayload>(defaultCreateUserFormData())
    const queryClient = useQueryClient()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    const { data, isSuccess, mutate, isPending } = useMutation<IUser, ApiError | Error, CreateUserRequestPayload>({
        mutationFn: (data) => createUserRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: UserQueryKeys.lists() }).catch(console.error)
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
