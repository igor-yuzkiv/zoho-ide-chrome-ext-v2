import { apiClient } from '../../api.client.ts'
import type { IUser } from '@zoho-ide/shared/entities/user'
import type { UpdateUserRequestPayload } from '../types.ts'

export async function updateUserRequest(id: string, payload: UpdateUserRequestPayload): Promise<IUser> {
    return apiClient.put<{ data: IUser }>(`users/${id}`, payload).then((r) => r.data.data)
}
