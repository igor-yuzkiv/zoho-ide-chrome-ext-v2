<script setup lang="ts">
import { useCreateKbItem } from '../../mutations'
import { useKbTemplatesListQuery } from '../../queries'
import { type IKnowledgeBaseItem } from '../../types'
import { MarkdownPreview } from '../index.ts'
import KnowledgeBaseItemForm from './KnowledgeBaseItemForm.vue'
import { FieldContainer } from '@zoho-ide/shared'
import { ref, watch } from 'vue'
import { Button, Select } from 'primevue'
import Dialog from 'primevue/dialog'

const emit = defineEmits<{ (event: 'created', item: IKnowledgeBaseItem): void }>()
const visible = defineModel<boolean>('visible', { default: false })
const { formData, submitAsync, formErrors, isPending, resetForm } = useCreateKbItem()

const { data: templates, isFetching: isFetchingTemplates, findById: findTemplateById } = useKbTemplatesListQuery()

const templateId = ref<string | undefined>()

function handleClickSubmit() {
    submitAsync().then((response) => {
        visible.value = false
        emit('created', response)
    })
}

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

watch(visible, (newVal) => {
    if (newVal === true) {
        resetForm()
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

            <KnowledgeBaseItemForm :form-errors="formErrors" v-model="formData" />
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
