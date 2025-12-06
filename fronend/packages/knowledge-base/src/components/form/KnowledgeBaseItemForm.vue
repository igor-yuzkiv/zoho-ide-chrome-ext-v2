<script setup lang="ts">
import { defaultKbItemFormData } from '../../knowledge-base.constants.ts'
import type { IKnowledgeBaseItem, KbItemFormData } from '../../types'
import { FieldContainer, useValidationErrors } from '@zoho-ide/shared'
import { TagsMultiSelect } from '@zoho-ide/tags'
import { computed } from 'vue'
import { InputText } from 'primevue'

const formData = defineModel<KbItemFormData>({ default: defaultKbItemFormData })
const props = withDefaults(defineProps<{ formErrors?: Record<string, string[]> }>(), { formErrors: () => ({}) })
const validationErrors = useValidationErrors(computed(() => props.formErrors || {}))

function handleChangeField(field: keyof IKnowledgeBaseItem, value: unknown) {
    formData.value = {
        ...formData.value,
        [field]: value,
    }
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <FieldContainer label="Name" input-id="article_name" :error-message="validationErrors.get('title')">
            <InputText
                fluid
                placeholder="Enter article name"
                :value="formData.title"
                @update:model-value="handleChangeField('title', $event)"
                :invalid="validationErrors.has('title')"
            />
        </FieldContainer>

        <TagsMultiSelect :model-value="formData.tags" @update:model-value="handleChangeField('tags', $event)" />
    </div>
</template>

<style scoped></style>
