<script setup lang="ts">
import { getDefaultFormData } from '../lib/useProviderSettingsForm.ts'
import { FieldContainer, useValidationErrors } from '@zoho-ide/shared'
import { computed } from 'vue'
import { Button, Dialog, InputText } from 'primevue'
import { ProviderSettingForm } from '@/features/provider/settings'

defineEmits<{ (e: 'submit'): void }>()
const props = withDefaults(defineProps<{ formErrors?: Record<string, string[]> }>(), { formErrors: () => ({}) })
const visible = defineModel<boolean>('visible', { default: false })
const formData = defineModel<ProviderSettingForm>('formData', { default: getDefaultFormData })

const validationErrors = useValidationErrors(computed(() => props.formErrors))

function handleInputChange(field: keyof ProviderSettingForm, value: unknown) {
    formData.value = {
        ...formData.value,
        [field]: value,
    }
}
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :draggable="false"
        header="Provider Settings"
        content-class="flex w-full h-full gap-2 overflow-hidden"
        :closable="false"
        class="w-2/6"
    >
        <div class="flex flex-col gap-2 w-full">
            <FieldContainer label="Title" input-id="title" :error-message="validationErrors.get('title')">
                <InputText
                    class="w-full"
                    :model-value="formData.title"
                    @update:model-value="handleInputChange('title', $event)"
                    :invalid="validationErrors.has('title')"
                />
            </FieldContainer>
            <FieldContainer
                label="Cache TTL (ms)"
                input-id="cacheTtlMs"
                :error-message="validationErrors.get('cacheTtlMs')"
            >
                <InputText
                    class="w-full"
                    type="number"
                    :model-value="String(formData.cacheTtlMs)"
                    @update:model-value="handleInputChange('cacheTtlMs', Number($event))"
                    :invalid="validationErrors.has('cacheTtlMs')"
                />
            </FieldContainer>
        </div>

        <template #footer>
            <div class="flex justify-between gap-2 w-full">
                <Button label="Cancel" severity="secondary" @click="visible = false" size="small" />
                <Button label="Save" severity="primary" size="small" @click="$emit('submit')" />
            </div>
        </template>
    </Dialog>
</template>

<style scoped></style>
