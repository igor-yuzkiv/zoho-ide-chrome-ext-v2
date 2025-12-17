<script setup lang="ts">
import { IFunctionEntity } from '@/capabilities/function/function.types.ts'
import { useAppThemeStore } from '@zoho-ide/shared'
import { computed } from 'vue'

const props = defineProps<{ fx: IFunctionEntity }>()
const appTheme = useAppThemeStore()
const jsonData = computed(() => {
    return JSON.stringify(props.fx, null, 2)
})
</script>

<template>
    <vue-monaco-editor language="json" :value="jsonData" :theme="appTheme.isDark ? 'vs-dark' : 'vs'" />
</template>

<style scoped></style>
