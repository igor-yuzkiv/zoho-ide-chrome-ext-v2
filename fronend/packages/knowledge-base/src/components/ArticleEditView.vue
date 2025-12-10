<script setup lang="ts">
import { defaultKbItemFormData } from '../knowledge-base.constants.ts'
import type { IKnowledgeBaseItem, KbItemFormData } from '../types'
import ArticleContentEditor from './ArticleContentEditor.vue'
import { IconButton } from '@zoho-ide/shared'
import { SelectTagsDialog, TagsChipList } from '@zoho-ide/tags'
import { ref } from 'vue'
import { InputText } from 'primevue'

const formData = defineModel<KbItemFormData>({ default: defaultKbItemFormData })
const tagsSelectDialog = ref(false)

function handleChangeField(field: keyof IKnowledgeBaseItem, value: unknown) {
    formData.value = { ...formData.value, [field]: value }
}
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full app-card" v-bind="$attrs">
        <div class="flex flex-col w-full p-3">
            <div class="flex items-center justify-between w-full">
                <InputText
                    unstyled
                    :model-value="formData.title"
                    @update:model-value="handleChangeField('title', $event)"
                    class="focus:outline-none focus:ring-0 text-3xl font-bold w-full"
                    placeholder="Article Title"
                    maxlength="255"
                />

                <div class="flex items-center gap-x-2">
                    <slot name="header-actions" />
                </div>
            </div>

            <div class="flex items-center gap-1">
                <IconButton
                    icon="mdi:tag-add"
                    text
                    class="p-0 w-6 h-6"
                    severity="secondary"
                    @click="tagsSelectDialog = true"
                />
                <TagsChipList :tags="formData.tags" inline item-class="px-1 py-0" />
            </div>
        </div>

        <ArticleContentEditor
            :model-value="formData.content"
            @update:model-value="handleChangeField('content', $event)"
            class="flex-grow overflow-auto border-none"
            item-id="test"
        />
    </div>

    <SelectTagsDialog
        v-model:visible="tagsSelectDialog"
        :tags="formData.tags"
        @update:tags="handleChangeField('tags', $event)"
    />
</template>

<style scoped></style>
