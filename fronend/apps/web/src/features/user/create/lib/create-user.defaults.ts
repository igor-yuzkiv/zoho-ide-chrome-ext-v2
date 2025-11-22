import type { CreateUserRequestPayload } from '@zoho-ide/backend-api/user'

export const defaultCreateUserFormData = (): CreateUserRequestPayload => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})
