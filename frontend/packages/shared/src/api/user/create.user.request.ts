import type { CreateUserRequestPayload, IUser } from '../../contracts/user/user.types.ts'
import { apiClient } from '../core'

export async function createUserRequest(payload: CreateUserRequestPayload): Promise<IUser> {
    return apiClient.post<{ data: IUser }>('users', payload).then((r) => r.data.data)
}
