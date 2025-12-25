import type { DeleteUserByIdResponse } from '../../contracts/user/user.types.ts'
import { apiClient } from '../core'

export async function deleteUserByIdRequest(userId: string): Promise<DeleteUserByIdResponse> {
    return apiClient.delete(`/users/${userId}`).then((response) => response.data)
}
