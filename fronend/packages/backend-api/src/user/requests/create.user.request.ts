import { apiClient } from '../../api.client.ts'
import type { IUser, CreateUserRequestPayload } from '../user.types.ts'

export async function createUserRequest (payload: CreateUserRequestPayload): Promise<IUser> {
    return apiClient.post<{ data: IUser }>('users', payload).then((r) => r.data.data)
}
