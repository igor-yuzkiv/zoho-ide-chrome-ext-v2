<script setup lang="ts">
import { FunctionTypeMetadataMap } from '@/config/function.config.ts'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { FunctionMetadata, FunctionType } from '@zoho-ide/shared'

const props = defineProps<{ type?: FunctionType }>()

const typeMetadata = computed<FunctionMetadata>(() => {
    return props.type && FunctionTypeMetadataMap[props.type]
        ? FunctionTypeMetadataMap[props.type]
        : FunctionTypeMetadataMap.unknown
})
</script>

<template>
    <Icon :icon="typeMetadata.icon" />
</template>

<style scoped></style>
