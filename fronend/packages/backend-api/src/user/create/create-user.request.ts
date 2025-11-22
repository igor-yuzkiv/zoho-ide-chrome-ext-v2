import { apiClient } from '../../api.client.ts'
import type { IUser } from '../user.types.ts'
import type { CreateUserRequestPayload } from './create-user.types.ts'

export default function (payload: CreateUserRequestPayload): Promise<IUser> {
    return apiClient.post<{ data: IUser }>('users', payload).then((r) => r.data.data)
}
