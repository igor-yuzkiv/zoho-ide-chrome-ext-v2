import type { MaybeRefOrGetter } from "vue";

export const UserKeys = {
    all: ["projects"],
    details: (userId: MaybeRefOrGetter) => [...UserKeys.all, "detail", userId],
};
