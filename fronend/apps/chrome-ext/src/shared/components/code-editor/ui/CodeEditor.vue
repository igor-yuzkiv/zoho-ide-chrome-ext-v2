<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit/composables'

const appTheme = useAppTheme()
const modelValue = defineModel<string>()
</script>

<template>
    <vue-monaco-editor
        language="javascript"
        v-model:value="modelValue"
        :theme="appTheme.isDark.value ? 'vs-dark' : 'vs'"
    />
</template>

<style scoped></style>
