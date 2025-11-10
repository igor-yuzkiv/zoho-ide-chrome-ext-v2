import type { AxiosError } from "axios";
import { getStatusCodeMessage } from "@/shared/api/api.utils.ts";

export class ApiError extends Error {
    error: AxiosError;
    name = "ApiError";

    constructor(error: AxiosError) {
        super();
        this.error = error;
    }

    get status(): number {
        return this.error?.response?.status || 500;
    }

    get displayMessage(): string {
        if (this.isValidationError) {
            const data = this.getData<{ message: string }>();
            return data?.message || getStatusCodeMessage(422);
        }

        return getStatusCodeMessage(this.status);
    }

    get isValidationError() {
        return this.status === 422 && this.error.response?.data;
    }

    getData<T = unknown>(): T | undefined {
        if (this.error.response) {
            return this.error.response.data as T;
        }
    }

    getValidationErrors(): Record<string, string[]> {
        const data = this.getData<{ errors: Record<string, string[]> }>();
        if (this.isValidationError && data?.errors) {
            return data.errors;
        }

        return {};
    }
}
