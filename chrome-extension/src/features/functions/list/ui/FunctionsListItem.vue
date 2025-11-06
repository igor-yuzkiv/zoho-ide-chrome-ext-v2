<script setup lang="ts">
import { type Component, useAttrs } from 'vue'
import type { IFunctionEntity } from '@/entities/function/model/function.types.ts'
import { FunctionIcon } from '@/entities/function/ui'

defineProps<{
    fx: IFunctionEntity
    as?: string | Component | undefined
}>()

const attrs = useAttrs()
</script>

<template>
    <component
        :is="as || 'div'"
        v-bind="attrs"
        class="flex items-center w-full cursor-pointer hover:bg-selection px-1 rounded gap-x-2"
        v-tooltip="{ value: `${fx.type}: ${fx.displayName}` }"
    >
        <FunctionIcon :type="fx.type" class="shrink-0" />
        <div class="truncate">{{ fx.displayName }}</div>
    </component>
</template>

<style scoped></style>
