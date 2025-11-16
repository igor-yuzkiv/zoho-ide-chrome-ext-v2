import type { MaybeRefOrGetter } from "vue";

export const UserKeys = {
    all: ["projects"],
    lists: () => [...UserKeys.all, "list"],
    details: (userId: MaybeRefOrGetter) => [...UserKeys.all, "detail", userId],
};
