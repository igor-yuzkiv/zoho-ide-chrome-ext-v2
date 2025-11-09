<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { startCase } from 'lodash'
import { Icon } from '@iconify/vue'
import type { WfWhenStatementNodeData } from '@/capabilities/workflow/model/workflow-schema.types.ts'

defineProps<{
    id: string
    data: WfWhenStatementNodeData
}>()
</script>

<template>
    <div class="flex flex-col text-black bg-gray-100 rounded-lg overflow-hidden break-all">
        <div class="flex items-center w-full gap-x-2 text-lg font-bold p-2 bg-amber-400">
            <Icon :icon="data.repeat ? 'material-symbols:repeat' : 'ph:repeat-once-fill'" class="w-6 h-6" />
            <div>When {{ data.moduleName }} {{ startCase(data.trigger) }}</div>
        </div>

        <div class="flex flex-col p-2">
            <ul class="ml-2 list-disc list-inside">
                <li v-for="(item, index) in data.criteria" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>

    <Handle type="source" :id="`${id}-bottom`" :position="Position.Right" />
    <Handle type="target" :id="`${id}-top`" :position="Position.Left" />
</template>

<style scoped></style>
