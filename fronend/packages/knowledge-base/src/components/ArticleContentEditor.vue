<script setup lang="ts">
import { KnowledgeBaseItemEntityType } from '../knowledge-base.constants.ts'
import { attachToEntityRequest } from '@zoho-ide/attachments'
import { useAppThemeStore } from '@zoho-ide/shared'
import { MdEditor } from 'md-editor-v3'

const props = defineProps<{ itemId: string }>()
const appTheme = useAppThemeStore()
const modelValue = defineModel<string>({ default: '' })

//TODO: upload images only after save article

async function handleUploadImages(files: File[], callback: (urls: string[]) => void) {
    if (!files.length) {
        return
    }

    const responses = await Promise.all(
        files.map((file) => {
            return attachToEntityRequest(
                KnowledgeBaseItemEntityType,
                props.itemId,
                file,
                'knowledge_base_article_content_image'
            )
        })
    )

    const uploadedImageUrls = responses.map((res) => res.public_link)
    callback(uploadedImageUrls)
}
</script>

<template>
    <MdEditor
        v-model="modelValue"
        language="en-US"
        previewTheme="github"
        codeTheme="github"
        :theme="appTheme.isDark ? 'dark' : 'light'"
        @onUploadImg="handleUploadImages"
    />
</template>

<style scoped></style>
