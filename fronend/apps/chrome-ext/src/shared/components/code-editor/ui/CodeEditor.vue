<script setup lang="ts">
import { useAppThemeStore } from '@zoho-ide/shared'

const appTheme = useAppThemeStore()
const modelValue = defineModel<string>()
</script>

<template>
    <vue-monaco-editor language="javascript" v-model:value="modelValue" :theme="appTheme.isDark ? 'vs-dark' : 'vs'" />
</template>

<style scoped></style>
