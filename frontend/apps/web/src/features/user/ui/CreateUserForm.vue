<script setup lang="ts">
import { useValidationErrors } from '@zoho-ide/shared'
import type { CreateUserRequestPayload } from '@zoho-ide/shared'
import { computed } from 'vue'
import { InputText, Password } from 'primevue'
import { FieldContainer } from '@zoho-ide/ui-kit'

const props = withDefaults(defineProps<{ formErrors?: Record<string, string[]> }>(), { formErrors: () => ({}) })
const formData = defineModel<CreateUserRequestPayload>('form-data', { required: true })
const validationErrors = useValidationErrors(computed(() => props.formErrors))
const handleFieldChange = (field: keyof CreateUserRequestPayload, value: unknown) => {
    formData.value = { ...formData.value, [field]: value }
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <FieldContainer label="Name" input-id="user_name" :error-message="validationErrors.get('name')">
            <InputText
                fluid
                :model-value="formData.name"
                @update:model-value="handleFieldChange('name', $event)"
                :invalid="validationErrors.has('name')"
            />
        </FieldContainer>

        <FieldContainer label="Email" input-id="user_email" :error-message="validationErrors.get('email')">
            <InputText
                fluid
                :model-value="formData.email"
                @update:model-value="handleFieldChange('email', $event)"
                type="email"
                :invalid="validationErrors.has('email')"
            />
        </FieldContainer>

        <FieldContainer label="Password" input-id="password" :error-message="validationErrors.get('password')">
            <Password
                fluid
                :model-value="formData.password"
                @update:model-value="handleFieldChange('password', $event)"
                :invalid="validationErrors.has('password')"
            />
        </FieldContainer>

        <FieldContainer
            label="Password Confirmation"
            input-id="password_confirmation"
            :error-message="validationErrors.get('password_confirmation')"
        >
            <Password
                fluid
                :model-value="formData.password_confirmation"
                @update:model-value="handleFieldChange('password_confirmation', $event)"
                :invalid="validationErrors.has('password_confirmation')"
            />
        </FieldContainer>
    </div>
</template>

<style scoped></style>
