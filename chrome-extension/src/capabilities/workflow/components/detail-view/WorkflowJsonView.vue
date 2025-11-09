<script setup lang="ts">
import { computed } from 'vue'
import { CodeEditor } from '@/shared/components/code-editor'
import type { IWorkflowEntity } from '@/capabilities/workflow/workflow.types.ts'
import type { ProviderType } from '@/entities/provider/provider.types.ts'

const props = defineProps<{
    providerType: ProviderType
    workflow: IWorkflowEntity
}>()

const jsonData = computed(() => {
    return props.workflow ? JSON.stringify(props.workflow, null, 2) : ''
})
</script>

<template>
    <CodeEditor :model-value="jsonData" />
</template>

<style scoped></style>
