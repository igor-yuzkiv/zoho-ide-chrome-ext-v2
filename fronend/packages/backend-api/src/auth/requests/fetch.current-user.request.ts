import { apiClient } from '../../api.client.ts'
import type { IUser } from '@zoho-ide/shared/entities/user'

export function fetchCurrentUserRequest(): Promise<{ data: IUser }> {
    return apiClient.get('/auth/me').then((res) => res.data)
}
