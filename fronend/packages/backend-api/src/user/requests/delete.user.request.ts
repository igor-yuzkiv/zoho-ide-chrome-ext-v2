import { apiClient } from '../../api.client.ts'

export async function deleteUserByIdRequest(userId: string): Promise<{ status: boolean }> {
    return apiClient.delete(`/users/${userId}`).then((response) => response.data)
}
