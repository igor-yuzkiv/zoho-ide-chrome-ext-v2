<script setup lang="ts">
import { computed } from 'vue'
import type {
    IModuleFieldMetadataEntity,
    IModuleMetadataEntity,
} from '@/capabilities/metadata/metadata.types.ts'
import { useAppThemeStore } from '@zoho-ide/shared'

const appTheme = useAppThemeStore()

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
    <vue-monaco-editor  language="json" :value="jsonData" :theme="appTheme.isDark ? 'vs-dark' : 'vs'"/>
</template>

<style scoped></style>
