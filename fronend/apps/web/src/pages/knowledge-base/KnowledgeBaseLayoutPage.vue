<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import { MdEditor } from 'md-editor-v3'
import { ref } from 'vue'

const test = ref('')
const { isDark } = useAppTheme()
</script>

<template>
    <MdEditor
        v-model="test"
        class="rounded-xl"
        style="height: 70vh"
        language="en-US"
        previewTheme="github"
        codeTheme="github"
        :theme="isDark ? 'dark' : 'light'"
    />
</template>

<style scoped></style>
