<script setup lang="ts">
import { useAppTheme } from '../../../composables'
import { MdEditor } from 'md-editor-v3'
import { config as mdEditorConfig } from 'md-editor-v3'

const { isDark } = useAppTheme()
const modelValue = defineModel<string>({ default: '' })

mdEditorConfig({
    katexConfig(base: any) {
        return {
            ...base,
            strict: false, // Disable strict mode to allow all cyrylic characters
        }
    },
})
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
