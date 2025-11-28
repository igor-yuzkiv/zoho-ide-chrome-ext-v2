import { apiClient } from '../../api.client.ts'
import type { IUser } from '@zoho-ide/shared/entities/user'

export async function fetchUserByIdRequest(userId: string): Promise<{ data: IUser }> {
    return apiClient.get<{ data: IUser }>(`/users/${userId}`).then((response) => response.data)
}
