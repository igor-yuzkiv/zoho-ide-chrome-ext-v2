<script setup lang="ts">
import { Dialog, InputText, Password, Button } from "primevue";
import type { CreateUserFromData } from "@/entities/user/model/user.types.ts";
import { defaultCreateUserFormData } from "@/features/user/create/lib/create-user.defaults.ts";
import { FieldContainer } from "@/shared/components/form";

defineEmits<{ (event: "submit", value: CreateUserFromData): void }>();
const props = withDefaults(
    defineProps<{
        isLoading?: boolean;
        formErrors?: Record<string, string[]>;
    }>(),
    { isLoading: false, formErrors: () => ({}) },
);

const visible = defineModel<boolean>("visible", { default: false });
const formData = defineModel<CreateUserFromData>("form-data", {
    default: defaultCreateUserFormData,
});

function handleFieldChange(field: keyof CreateUserFromData, value: unknown) {
    formData.value = {
        ...formData.value,
        [field]: value,
    };
}

function getFieldErrors(field: keyof CreateUserFromData): string[] | undefined {
    return props.formErrors ? props.formErrors[field] : undefined;
}
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        header="New User"
        :draggable="false"
        :style="{ width: '30vw' }"
    >
        <div class="flex flex-col gap-2">
            <FieldContainer
                label="Name"
                input-id="user_name"
                :error-message="getFieldErrors('name')"
            >
                <InputText
                    fluid
                    :model-value="formData.name"
                    @update:model-value="handleFieldChange('name', $event)"
                />
            </FieldContainer>

            <FieldContainer
                label="Email"
                input-id="user_email"
                :error-message="getFieldErrors('email')"
            >
                <InputText
                    fluid
                    :model-value="formData.email"
                    @update:model-value="handleFieldChange('email', $event)"
                    type="email"
                />
            </FieldContainer>

            <FieldContainer
                label="Password"
                input-id="password"
                :error-message="getFieldErrors('password')"
            >
                <Password
                    fluid
                    :model-value="formData.password"
                    @update:model-value="handleFieldChange('password', $event)"
                />
            </FieldContainer>

            <FieldContainer
                label="Password Confirmation"
                input-id="password_confirmation"
                :error-message="getFieldErrors('password_confirmation')"
            >
                <Password
                    fluid
                    :model-value="formData.password_confirmation"
                    @update:model-value="
                        handleFieldChange('password_confirmation', $event)
                    "
                />
            </FieldContainer>
        </div>

        <template #footer>
            <Button @click="$emit('submit', formData)" :disabled="isLoading">
                Create
            </Button>
        </template>
    </Dialog>
</template>

<style scoped></style>
