import { ref } from "vue";
import type {
    CreateUserFromData,
    IUser,
} from "@/entities/user/model/user.types.ts";
import { defaultCreateUserFormData } from "@/features/user/create/lib/create-user.defaults.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createUserRequest } from "@/entities/user/api";
import { UserKeys } from "@/entities/user/model/user.keys.ts";
import { ApiError } from "@/shared/api/api.error.ts";
import { useToast } from "@/shared/composables/useToast.ts";

export function useCreateUser() {
    const visible = ref(false);
    const formData = ref<CreateUserFromData>(defaultCreateUserFormData());
    const queryClient = useQueryClient();
    const toast = useToast();
    const formErrors = ref<Record<string, string[]>>({});

    function open() {
        formData.value = defaultCreateUserFormData();
        visible.value = true;
    }

    function close() {
        visible.value = false;
    }

    const { mutate, isPending } = useMutation<
        IUser,
        ApiError | Error,
        CreateUserFromData
    >({
        mutationFn: (data) => createUserRequest(data),
        onSuccess: () => {
            queryClient
                .invalidateQueries({ queryKey: UserKeys.all })
                .catch(console.error);

            close();
        },
        onError: (error) => {
            let errorMessage =
                "An unexpected error occurred. Please try again.";

            if (error instanceof ApiError) {
                errorMessage = error.displayMessage;

                if (error.isValidationError) {
                    formErrors.value = error.getValidationErrors();
                }
            }

            toast.error({ detail: errorMessage });
        },
    });

    async function submit() {
        formErrors.value = {};
        mutate(formData.value);
    }

    return {
        visible,
        formData,
        isPending,
        open,
        submit,
        formErrors,
    };
}
