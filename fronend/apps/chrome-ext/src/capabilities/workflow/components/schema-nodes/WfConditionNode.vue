<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { Icon } from '@iconify/vue'
import type { WfConditionNodeData } from '@/capabilities/workflow/workflow-schema.types.ts'

defineProps<{
    id: string
    data: WfConditionNodeData
}>()
</script>

<template>
    <div class="flex flex-col overflow-hidden break-all bg-secondary rounded-lg border">
        <div class="flex items-center border-b p-4 gap-4">
            <Icon icon="carbon:condition-point" class="text-2xl text-green-500" />
            <div class="text-xl font-bold">{{ data.label }}</div>
        </div>

        <div class="flex flex-col p-2 bg-primary">
            <ul class="ml-2 list-disc list-inside">
                <li v-for="(item, index) in data.criteria" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>

    <Handle type="source" :id="`${id}-bottom`" :position="Position.Right" />
    <Handle type="target" :id="`${id}-top`" :position="Position.Left" />
</template>

<style scoped></style>
