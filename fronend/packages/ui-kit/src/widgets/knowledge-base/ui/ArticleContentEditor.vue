<script setup lang="ts">
import { useAppTheme } from '../../../composables'
// import { useAttachToEntityMutation } from '@zoho-ide/shared/entities/attachment'
// import { KnowledgeBaseItemEntityType } from '@zoho-ide/shared/entities/knowledge-base'
import { MdEditor } from 'md-editor-v3'
import { config as mdEditorConfig } from 'md-editor-v3'

mdEditorConfig({
    katexConfig(base: any) {
        return {
            ...base,
            strict: false, // Disable strict mode to allow all cyrylic characters
        }
    },
})

const { isDark } = useAppTheme()
const modelValue = defineModel<string>({ default: '' })
// const props = defineProps<{ itemId: string }>()
// const { upload } = useAttachToEntityMutation(KnowledgeBaseItemEntityType, props.itemId, 'article_content')
// @onUploadImg="handleUploadImg"
// async function handleUploadImg(files: File[], callback: (urls: string[]) => void) {
//     if (!files.length) {
//         return
//     }
//
//     await Promise.all(files.map((file) => upload(file)))
// }
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
    />
</template>

<style scoped></style>
