import { apiClient } from '../../../api'
import type { CreateUserRequestPayload, IUser } from '../types/user.types.ts'

export async function createUserRequest(payload: CreateUserRequestPayload): Promise<IUser> {
    return apiClient.post<{ data: IUser }>('users', payload).then((r) => r.data.data)
}
