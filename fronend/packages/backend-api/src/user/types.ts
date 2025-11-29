export interface CreateUserRequestPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface UpdateUserRequestPayload {
    name: string
    email: string
}

export type DeleteUserByIdResponse = { status: boolean };