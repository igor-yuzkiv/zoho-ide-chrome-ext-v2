import type { CreateUserFromData } from "@/entities/user/model/user.types.ts";

export const defaultCreateUserFormData = (): CreateUserFromData => ({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});
