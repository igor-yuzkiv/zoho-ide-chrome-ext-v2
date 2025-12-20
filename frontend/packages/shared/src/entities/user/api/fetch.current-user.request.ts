import { apiClient } from '../../../api'
import type { IUser } from '../types/user.types.ts'

export function fetchCurrentUserRequest(): Promise<{ data: IUser }> {
    return apiClient.get('/auth/me').then((res) => res.data)
}
