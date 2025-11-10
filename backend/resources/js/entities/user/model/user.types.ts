export interface IUser {
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
