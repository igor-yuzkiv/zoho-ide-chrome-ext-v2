<script setup lang="ts">
import { KnowledgeBaseCategoryOptions } from '../knowledge-base.constants.ts'
import { useCreateKbItem } from '../mutations'
import { useKbTemplatesListQuery } from '../queries'
import { type IKnowledgeBaseItem } from '../types'
import { MarkdownPreview, useValidationErrors } from '@zoho-ide/shared'
import { FieldContainer, useToast } from '@zoho-ide/shared'
import { TagsMultiSelect } from '@zoho-ide/tags'
import { computed, ref, watch } from 'vue'
import { Button, Dialog, InputText, Select } from 'primevue'

const toast = useToast()

const emit = defineEmits<{ (event: 'created', item: IKnowledgeBaseItem): void }>()
const visible = defineModel<boolean>('visible', { default: false })
const { formData, submitFormData, formErrors, isPending, resetFormData } = useCreateKbItem({
    onError: (displayMessage) => toast.error({ detail: displayMessage }),
})
const validationErrors = useValidationErrors(computed(() => formErrors.value || {}))
const { data: templates, isFetching: isFetchingTemplates, findById: findTemplateById } = useKbTemplatesListQuery()
const templateId = ref<string | undefined>()

function handleSelectTemplate(value?: string) {
    templateId.value = value
    if (!value) {
        return
    }

    const templateData = findTemplateById(value)
    if (templateData) {
        formData.value = {
            ...formData.value,
            content: templateData.content,
        }
    }
}

function handleChangeField(field: keyof IKnowledgeBaseItem, value: unknown) {
    formData.value = {
        ...formData.value,
        [field]: value,
    }
}

function handleClickSubmit() {
    submitFormData().then((response) => {
        visible.value = false
        emit('created', response)
    })
}

watch(visible, (newVal) => {
    if (newVal === true) {
        resetFormData()
        templateId.value = undefined
    }
})
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :draggable="false"
        header="New Knowledge Base Item"
        content-class="flex w-full h-full gap-2 overflow-hidden"
        :closable="false"
        class="w-4/5 h-4/5"
    >
        <div class="flex flex-col gap-2 shrink-0 overflow-auto app-thin-scrollbar w-1/3">
            <FieldContainer label="Template" input-id="template_id">
                <Select
                    fluid
                    :options="templates"
                    option-value="id"
                    option-label="name"
                    placeholder="Select template"
                    :loading="isFetchingTemplates"
                    :model-value="templateId"
                    @update:model-value="handleSelectTemplate"
                    showClear
                />
            </FieldContainer>

            <FieldContainer label="Title" input-id="article_name" :error-message="validationErrors.get('title')">
                <InputText
                    fluid
                    placeholder="Enter article name"
                    :value="formData.title"
                    @update:model-value="handleChangeField('title', $event)"
                    :invalid="validationErrors.has('title')"
                />
            </FieldContainer>

            <FieldContainer label="Category" input-id="category">
                <Select
                    fluid
                    :options="KnowledgeBaseCategoryOptions"
                    option-value="value"
                    option-label="label"
                    placeholder="Select category"
                    :loading="isFetchingTemplates"
                    :value="formData.category"
                    @update:model-value="handleChangeField('category', $event)"
                />
            </FieldContainer>

            <TagsMultiSelect :model-value="formData.tags" @update:model-value="handleChangeField('tags', $event)" />
        </div>

        <div class="flex w-full h-full overflow-auto app-thin-scrollbar app-card p-2">
            <MarkdownPreview :content="formData?.content" />
        </div>

        <template #footer>
            <div class="flex items-center justify-between">
                <Button label="Cancel" severity="secondary" text @click="visible = false" :disabled="isPending" />
                <Button label="Create" text @click="handleClickSubmit" :disabled="isPending" />
            </div>
        </template>
    </Dialog>
</template>

<style scoped></style>
