import { apiClient } from '../../../api'
import type { DeleteUserByIdResponse } from '../user.types.ts'

export async function deleteUserByIdRequest(userId: string): Promise<DeleteUserByIdResponse> {
    return apiClient.delete(`/users/${userId}`).then((response) => response.data)
}
