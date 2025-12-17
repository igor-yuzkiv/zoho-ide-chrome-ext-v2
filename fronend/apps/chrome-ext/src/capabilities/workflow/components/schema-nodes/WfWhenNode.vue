<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { WfWhenStatementNodeData } from '@zoho-ide/shared'
import { startCase } from 'lodash'
import { Icon } from '@iconify/vue'

defineProps<{
    id: string
    data: WfWhenStatementNodeData
}>()
</script>

<template>
    <div class="flex flex-col overflow-hidden break-all bg-secondary rounded-lg border">
        <div class="flex items-center border-b p-4 gap-4">
            <Icon icon="grommet-icons:trigger" class="text-2xl text-amber-600" />
            <div class="flex flex-col">
                <div class="text-xl font-bold leading-5">{{ data.moduleName }}</div>
                <div class="leading-5">{{ startCase(data.trigger) }}</div>
            </div>
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
