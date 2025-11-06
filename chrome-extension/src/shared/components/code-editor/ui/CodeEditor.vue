<script setup lang="ts">
import { useAppThemeStore } from '@/app/store/useAppThemeStore.ts'

const themeStore = useAppThemeStore()
const modelValue = defineModel<string>()
</script>

<template>
    <vue-monaco-editor language="javascript" v-model:value="modelValue" :theme="themeStore.isDark ? 'vs-dark' : null" />
</template>

<style scoped></style>
