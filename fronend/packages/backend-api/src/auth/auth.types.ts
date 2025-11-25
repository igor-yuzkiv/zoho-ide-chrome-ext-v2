import type { IUser } from '@zoho-ide/shared/entities/user'

export type LoginResponse = {
    data: IUser
    token: string
}
