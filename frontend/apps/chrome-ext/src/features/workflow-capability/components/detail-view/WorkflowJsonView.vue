<script setup lang="ts">
import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import type { ZohoServiceProviderType } from '@zoho-ide/shared'
import { computed } from 'vue'
import { useAppThemeStore } from '@zoho-ide/ui-kit'

const appTheme = useAppThemeStore()

const props = defineProps<{
    providerType: ZohoServiceProviderType
    workflow: IWorkflowRecordEntity
}>()

const jsonData = computed(() => {
    return props.workflow ? JSON.stringify(props.workflow, null, 2) : ''
})
</script>

<template>
    <vue-monaco-editor language="json" :value="jsonData" :theme="appTheme.isDark ? 'vs-dark' : 'vs'" />
</template>

<style scoped></style>
