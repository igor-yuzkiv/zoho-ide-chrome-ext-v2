import type { LoginResponse } from '../../contracts/user/auth.types.ts'
import { apiClient } from '../core'

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
    return apiClient.post('/auth/login', { email, password }).then((res) => res.data)
}
