import type { IEntity } from '../../types'

export interface IUser extends IEntity {
    id: string
    name: string
    email: string
    acronym: string
}

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

export type DeleteUserByIdResponse = { status: boolean }
