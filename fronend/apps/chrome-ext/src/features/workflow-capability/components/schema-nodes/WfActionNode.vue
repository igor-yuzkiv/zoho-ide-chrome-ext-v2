<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { WfActionNodeData } from '@zoho-ide/shared'
import { Icon } from '@iconify/vue'

defineProps<{
    id: string
    data: WfActionNodeData
}>()
</script>

<template>
    <div class="flex flex-col overflow-hidden break-all bg-secondary rounded-lg border">
        <div class="flex items-center border-b p-4 gap-4">
            <Icon icon="material-symbols:function" class="text-2xl text-purple-500" />
            <div class="text-xl font-bold leading-5">{{ data.label }}</div>
        </div>

        <div class="flex flex-col p-2 bg-primary">
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
