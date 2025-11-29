import { apiClient } from '../../api.client.ts'
import type { CreateUserRequestPayload } from '../user.api.types.ts'
import type { IUser } from '@zoho-ide/shared/entities/user'

export async function createUserRequest(payload: CreateUserRequestPayload): Promise<IUser> {
    return apiClient.post<{ data: IUser }>('users', payload).then((r) => r.data.data)
}
