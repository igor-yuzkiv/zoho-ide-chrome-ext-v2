<script setup lang="ts" generic="T extends ICapabilityEntity = ICapabilityEntity">
import { type Component, useAttrs } from 'vue'
import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'

defineProps<{
    item: T
    as?: string | Component | undefined
}>()

const attrs = useAttrs()
</script>

<template>
    <component
        :is="as || 'div'"
        v-bind="attrs"
        class="flex items-center w-full cursor-pointer hover:bg-selection px-1 rounded gap-x-2"
        v-tooltip="{ value: item.displayName }"
    >
        <div class="truncate">{{ item.displayName }}</div>
    </component>
</template>

<style scoped></style>
