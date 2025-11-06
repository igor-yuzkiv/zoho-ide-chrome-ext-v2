<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { Icon } from '@iconify/vue'
import type { WfActionNodeData } from '@/entities/workflow/model/workflow-schema.types.ts'

defineProps<{
    id: string
    data: WfActionNodeData
}>()
</script>

<template>
    <div class="flex flex-col text-black bg-gray-100 rounded-lg overflow-hidden break-all">
        <div class="flex items-center w-full gap-x-2 text-lg font-bold p-2 bg-blue-400">
            <Icon icon="carbon:action-usage" class="w-6 h-6" />
            <div>{{ data.label }}</div>
        </div>

        <div class="flex flex-col gap-1 p-2">
            <div class="flex items-center gap-x-2">
                <div class="font-bold">Type:</div>
                <div>{{ data.type }}</div>
            </div>
            <div class="flex items-center gap-x-2">
                <div class="font-bold">Name:</div>
                <div>{{ data.name }}</div>
            </div>
        </div>
    </div>

    <Handle type="source" :id="`${id}-bottom`" :position="Position.Right" />
    <Handle type="target" :id="`${id}-top`" :position="Position.Left" />
</template>

<style scoped></style>
