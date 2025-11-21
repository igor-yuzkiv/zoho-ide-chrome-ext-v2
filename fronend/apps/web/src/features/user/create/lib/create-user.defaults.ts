import type { CreateUserRequestPayload } from '@zoho-ide/backend-api/entities/user'

export const defaultCreateUserFormData = (): CreateUserRequestPayload => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})
