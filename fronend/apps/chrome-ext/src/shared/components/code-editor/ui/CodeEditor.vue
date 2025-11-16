<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit'

const appTheme = useAppTheme()
const modelValue = defineModel<string>()
</script>

<template>
    <vue-monaco-editor language="javascript" v-model:value="modelValue" :theme="appTheme.isDark ? 'vs-dark' : null" />
</template>

<style scoped></style>
