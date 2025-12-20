import type { IUser } from './user.types.ts'

export type LoginResponse = {
    data: IUser
    token: string
}
