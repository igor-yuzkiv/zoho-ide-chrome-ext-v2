import type { IUser } from '../../contracts/user/user.types.ts'
import { apiClient } from '../core'

export function fetchCurrentUserRequest(): Promise<{ data: IUser }> {
    return apiClient.get('/auth/me').then((res) => res.data)
}
