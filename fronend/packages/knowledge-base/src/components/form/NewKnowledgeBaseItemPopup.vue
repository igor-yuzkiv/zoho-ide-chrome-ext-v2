<script setup lang="ts">
import { useCreateKnowledgeBaseItem } from '../../mutations'
import { type IKnowledgeBaseItem } from '../../types'
import KnowledgeBaseItemForm from './KnowledgeBaseItemForm.vue'
import { Button } from 'primevue'
import Dialog from 'primevue/dialog'

const emit = defineEmits<{ (event: 'created', item: IKnowledgeBaseItem): void }>()
const visible = defineModel<boolean>('visible', { default: false })
const { formData, submitAsync, formErrors, isPending } = useCreateKnowledgeBaseItem()

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
        <KnowledgeBaseItemForm :form-errors="formErrors" v-model="formData" />

        <template #footer>
            <div class="flex items-center justify-between">
                <Button label="Cancel" severity="secondary" text @click="visible = false" :disabled="isPending" />
                <Button label="Create" text @click="handleClickSubmit" :disabled="isPending" />
            </div>
        </template>
    </Dialog>
</template>

<style scoped></style>
