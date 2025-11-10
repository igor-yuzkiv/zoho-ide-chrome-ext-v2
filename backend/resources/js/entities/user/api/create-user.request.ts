import type {
    CreateUserFromData,
    IUser,
} from "@/entities/user/model/user.types.ts";
import { apiClient } from "@/shared/api/api.client.ts";

export default function (payload: CreateUserFromData): Promise<IUser> {
    return apiClient.post("users", payload).then((r) => r.data);
}
