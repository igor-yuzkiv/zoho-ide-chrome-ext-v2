import { apiClient } from '../../api.client.ts'
import type { UpdateUserRequestPayload } from '../user.api.types.ts'
import type { IUser } from '@zoho-ide/shared/entities/user'

export async function updateUserRequest(id: string, payload: UpdateUserRequestPayload): Promise<IUser> {
    return apiClient.put<{ data: IUser }>(`users/${id}`, payload).then((r) => r.data.data)
}
