import { apiClient } from '../../../api'
import type { IUser } from '../types/user.types.ts'

export async function fetchUserByIdRequest(userId: string): Promise<{ data: IUser }> {
    return apiClient.get<{ data: IUser }>(`/users/${userId}`).then((response) => response.data)
}
