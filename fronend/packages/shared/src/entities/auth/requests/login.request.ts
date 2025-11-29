import { apiClient } from '../../../api'
import type { LoginResponse } from '../auth.types.ts'

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
    return apiClient.post('/auth/login', { email, password }).then((res) => res.data)
}
