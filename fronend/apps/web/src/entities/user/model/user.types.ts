export interface IUser extends Record<string, unknown> {
    id: string;
    name: string;
    email: string;
}

export interface CreateUserFromData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
