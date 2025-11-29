<script setup lang="ts">
import type { EditorImageUploadPayload } from '../../types'
import { useAppTheme } from '@zoho-ide/shared/composables'
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

const emit = defineEmits<{ (event: 'upload-img', value: EditorImageUploadPayload): void }>()
const { isDark } = useAppTheme()
const modelValue = defineModel<string>({ default: '' })

function handleUploadImages(files: File[], callback: (urls: string[]) => void) {
    emit('upload-img', { files, callback })
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
