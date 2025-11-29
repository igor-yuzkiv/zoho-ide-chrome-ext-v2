<script setup lang="ts">
import { useCreateKbItem } from '../lib/useCreateKbItem.ts'
import { type IKnowledgeBaseItem } from '@zoho-ide/knowledge-base'
import { useValidationErrors } from '@zoho-ide/shared/composables'
import { FieldContainer } from '@zoho-ide/shared/components'
import { Button, InputText } from 'primevue'
import Dialog from 'primevue/dialog'

const emit = defineEmits<{ (event: 'created', item: IKnowledgeBaseItem): void }>()
const visible = defineModel<boolean>('visible', { default: false })

const { formData, submitAsync, formErrors, isPending } = useCreateKbItem()
const validationErrors = useValidationErrors(() => formErrors.value)

function handleClickSubmit() {
    submitAsync().then((response) => {
        visible.value = false
        emit('created', response)
    })
}
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :draggable="false"
        header="New Knowledge Base Item"
        class="w-lg"
        :closable="false"
    >
        <FieldContainer label="Name" input-id="article_name" :error-message="validationErrors.get('title')">
            <InputText
                fluid
                placeholder="Enter article name"
                v-model="formData.title"
                :invalid="validationErrors.has('title')"
            />
        </FieldContainer>

        <template #footer>
            <div class="flex items-center justify-between">
                <Button label="Cancel" severity="secondary" text @click="visible = false" :disabled="isPending" />
                <Button label="Create" text @click="handleClickSubmit" :disabled="isPending" />
            </div>
        </template>
    </Dialog>
</template>

<style scoped></style>
