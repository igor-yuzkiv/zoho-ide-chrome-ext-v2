import type { IUser } from '../../contracts/user'
import { apiClient } from '../core'

export async function loginRequest(email: string, password: string): Promise<{ data: IUser, token: string }> {
    return apiClient.post('/auth/login', { email, password }).then((res) => res.data)
}
