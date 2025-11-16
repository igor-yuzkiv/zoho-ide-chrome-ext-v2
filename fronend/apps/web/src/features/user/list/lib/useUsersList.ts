import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import type { IUser } from "@/entities/user/model/user.types.ts";
import { fetchUsersRequest } from "@/entities/user/api";
import { UserKeys } from "@/entities/user/model/user.keys.ts";

export function useUsersList() {
    const { isPending, isFetching, data } = useQuery<IUser[]>({
        queryKey: [...UserKeys.lists()],
        placeholderData: keepPreviousData,
        queryFn: () => fetchUsersRequest().then((r) => r.data),
        initialData: [],
    });

    return {
        isPending,
        isFetching,
        data,
    };
}
