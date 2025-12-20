<script setup lang="ts">
import { useValidationErrors } from '@zoho-ide/shared'
import type { UpdateUserRequestPayload } from '@zoho-ide/shared'
import { FieldContainer } from '@zoho-ide/shared'
import { computed } from 'vue'
import { InputText } from 'primevue'

const props = withDefaults(defineProps<{ formErrors?: Record<string, string[]> }>(), { formErrors: () => ({}) })
const formData = defineModel<UpdateUserRequestPayload>('form-data', { required: true })
const validationErrors = useValidationErrors(computed(() => props.formErrors))
const handleFieldChange = (field: keyof UpdateUserRequestPayload, value: unknown) => {
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
                :invalid="validationErrors.has('email')"
                type="email"
            />
        </FieldContainer>
    </div>
</template>

<style scoped></style>
