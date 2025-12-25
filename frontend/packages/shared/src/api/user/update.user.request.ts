import type { IUser, UpdateUserRequestPayload } from '../../contracts/user/user.types.ts'
import { apiClient } from '../core'

export async function updateUserRequest(id: string, payload: UpdateUserRequestPayload): Promise<IUser> {
    return apiClient.put<{ data: IUser }>(`users/${id}`, payload).then((r) => r.data.data)
}
