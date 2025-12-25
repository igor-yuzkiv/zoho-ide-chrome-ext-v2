<script setup lang="ts">
import { useAppThemeStore } from '@zoho-ide/ui-kit'

const script = defineModel<string>('script', { default: '' })
const appTheme = useAppThemeStore()
</script>

<template>
    <vue-monaco-editor language="javascript" v-model:value="script" :theme="appTheme.isDark ? 'vs-dark' : 'vs'" />
</template>

<style scoped></style>
