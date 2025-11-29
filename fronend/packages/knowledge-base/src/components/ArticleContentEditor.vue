<script setup lang="ts">
import { KnowledgeBaseItemEntityType } from '../knowledge-base.constants.ts'
import type { EditorImageUploadPayload } from '../types'
import { attachToEntityRequest } from '@zoho-ide/attachments'
import { useAppTheme } from '@zoho-ide/shared'
import { MdEditor } from 'md-editor-v3'
import { config as mdEditorConfig } from 'md-editor-v3'

mdEditorConfig({
    katexConfig(base: any) {
        return {
            ...base,
            strict: false, // Disable strict mode to allow all cyrillic characters
        }
    },
})

const props = defineProps<{itemId: string}>()
const { isDark } = useAppTheme()
const modelValue = defineModel<string>({ default: '' })

async function handleUploadImages(payload: EditorImageUploadPayload) {
    console.log('Uploading images:', payload)
    if (!payload.files.length) {
        return
    }

    const responses = await Promise.all(
        payload.files.map((file) => {
            return attachToEntityRequest(
                KnowledgeBaseItemEntityType,
                props.itemId,
                file,
                'knowledge_base_article_content_image'
            )
        })
    )

    const uploadedImageUrls = responses.map((res) => res.public_link)
    payload.callback(uploadedImageUrls)
}
</script>

<template>
    <MdEditor
        v-model="modelValue"
        class="rounded-xl flex flex-grow app-card"
        style="height: 70vh"
        language="en-US"
        previewTheme="github"
        codeTheme="github"
        :theme="isDark ? 'dark' : 'light'"
        @onUploadImg="handleUploadImages"
    />
</template>

<style scoped></style>
