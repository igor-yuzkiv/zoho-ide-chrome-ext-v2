<script setup lang="ts">
import { InputText, Password } from 'primevue'
import { FieldContainer } from '@/shared/components/form'
import type { CreateUserRequestPayload } from '@zoho-ide/backend-api/entities/user'
import { defaultCreateUserFormData } from '@/features/user/create/lib/create-user.defaults.ts'

const props = withDefaults(
    defineProps<{
        isLoading?: boolean
        formErrors?: Record<string, string[]>
    }>(),
    { isLoading: false, formErrors: () => ({}) }
)

const formData = defineModel<CreateUserRequestPayload>('form-data', { default: defaultCreateUserFormData })

function handleFieldChange(field: keyof CreateUserRequestPayload, value: unknown) {
    formData.value = {
        ...formData.value,
        [field]: value,
    }
}

function getFieldErrors(field: keyof CreateUserRequestPayload): string[] | undefined {
    return props.formErrors ? props.formErrors[field] : undefined
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <FieldContainer label="Name" input-id="user_name" :error-message="getFieldErrors('name')">
            <InputText fluid :model-value="formData.name" @update:model-value="handleFieldChange('name', $event)" />
        </FieldContainer>

        <FieldContainer label="Email" input-id="user_email" :error-message="getFieldErrors('email')">
            <InputText
                fluid
                :model-value="formData.email"
                @update:model-value="handleFieldChange('email', $event)"
                type="email"
            />
        </FieldContainer>

        <FieldContainer label="Password" input-id="password" :error-message="getFieldErrors('password')">
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
                @update:model-value="handleFieldChange('password_confirmation', $event)"
            />
        </FieldContainer>
    </div>
</template>

<style scoped></style>
