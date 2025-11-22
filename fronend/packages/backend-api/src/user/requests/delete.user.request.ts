import { apiClient } from '../../api.client.ts'

export type DeleteUserByIdResponse = { status: boolean }

export async function deleteUserByIdRequest(userId: string): Promise<DeleteUserByIdResponse> {
    return apiClient.delete(`/users/${userId}`).then((response) => response.data)
}
