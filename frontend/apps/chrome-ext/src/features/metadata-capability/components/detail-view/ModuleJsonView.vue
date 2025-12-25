<script setup lang="ts">
import type { IModuleFieldMetadataRecordEntity, IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import { computed } from 'vue'
import { useAppThemeStore } from '@zoho-ide/ui-kit'

const appTheme = useAppThemeStore()

const props = defineProps<{
    module?: IModuleMetadataRecordEntity
    fields?: IModuleFieldMetadataRecordEntity[]
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
    <vue-monaco-editor language="json" :value="jsonData" :theme="appTheme.isDark ? 'vs-dark' : 'vs'" />
</template>

<style scoped></style>
