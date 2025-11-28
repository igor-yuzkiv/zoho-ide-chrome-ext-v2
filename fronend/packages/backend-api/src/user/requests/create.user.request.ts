import { apiClient } from '../../api.client.ts'
import type { IUser } from '@zoho-ide/shared/entities/user'
import type { CreateUserRequestPayload } from '../types.ts'

export async function createUserRequest (payload: CreateUserRequestPayload): Promise<IUser> {
    return apiClient.post<{ data: IUser }>('users', payload).then((r) => r.data.data)
}
