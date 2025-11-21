import type { CreateUserRequestPayload } from '@/entities/user'
import { apiClient } from '@/lib/api.client.ts'
import type { IUser } from '@/entities/user/user.types.ts'

export default function (payload: CreateUserRequestPayload): Promise<IUser> {
    return apiClient.post<{ data: IUser }>('users', payload).then((r) => r.data.data)
}
