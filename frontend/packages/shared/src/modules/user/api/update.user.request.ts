import { apiClient } from '../../../api'
import type { IUser, UpdateUserRequestPayload } from '../types/user.types.ts'

export async function updateUserRequest(id: string, payload: UpdateUserRequestPayload): Promise<IUser> {
    return apiClient.put<{ data: IUser }>(`users/${id}`, payload).then((r) => r.data.data)
}
