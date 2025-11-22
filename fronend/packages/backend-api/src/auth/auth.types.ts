import type { IUser } from '../user'

export type LoginResponse = {
    data: IUser
    token: string
}
