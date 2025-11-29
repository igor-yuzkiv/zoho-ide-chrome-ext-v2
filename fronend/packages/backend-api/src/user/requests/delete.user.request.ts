import { apiClient } from '../../api.client.ts'
import type { DeleteUserByIdResponse } from '../types'

export async function deleteUserByIdRequest(userId: string): Promise<DeleteUserByIdResponse> {
    return apiClient.delete(`/users/${userId}`).then((response) => response.data)
}
