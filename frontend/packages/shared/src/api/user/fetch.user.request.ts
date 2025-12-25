import type { IUser } from '../../contracts/user/user.types.ts'
import { apiClient } from '../core'

export async function fetchUserByIdRequest(userId: string): Promise<{ data: IUser }> {
    return apiClient.get<{ data: IUser }>(`/users/${userId}`).then((response) => response.data)
}
