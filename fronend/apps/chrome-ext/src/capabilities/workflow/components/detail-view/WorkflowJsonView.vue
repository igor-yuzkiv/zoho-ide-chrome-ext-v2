<script setup lang="ts">
import type { IWorkflowEntity } from '@zoho-ide/shared'
import type { ProviderType } from '@zoho-ide/shared'
import { useAppThemeStore } from '@zoho-ide/shared'
import { computed } from 'vue'

const appTheme = useAppThemeStore()

const props = defineProps<{
    providerType: ProviderType
    workflow: IWorkflowEntity
}>()

const jsonData = computed(() => {
    return props.workflow ? JSON.stringify(props.workflow, null, 2) : ''
})
</script>

<template>
    <vue-monaco-editor language="json" :value="jsonData" :theme="appTheme.isDark ? 'vs-dark' : 'vs'" />
</template>

<style scoped></style>
