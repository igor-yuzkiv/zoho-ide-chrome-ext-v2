<script setup lang="ts">
import { computed } from 'vue'
import { CodeEditor } from '@/shared/components/code-editor'
import type {
    IModuleFieldMetadataEntity,
    IModuleMetadataEntity,
} from '@/capabilities/metadata/metadata.types.ts'

const props = defineProps<{
    module?: IModuleMetadataEntity
    fields?: IModuleFieldMetadataEntity[]
}>()

const jsonData = computed(() => {
    const data = {
        module: props.module || null,
        fields: props.fields || [],
    }

    return JSON.stringify(data, null, 2)
})
</script>

<template>
    <CodeEditor :model-value="jsonData" />
</template>

<style scoped></style>
