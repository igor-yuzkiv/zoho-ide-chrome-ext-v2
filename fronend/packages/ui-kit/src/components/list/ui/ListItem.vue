<script setup lang="ts">
import { type Component } from 'vue'
import { Icon } from '@iconify/vue'

defineProps<{
    title?: string
    icon?: string
    tooltip?: string
    as?: string | Component | undefined
}>()
</script>

<template>
    <component
        class="flex items-center w-full cursor-pointer hover:bg-selection px-1 rounded gap-x-2"
        :is="as || 'div'"
        v-tooltip="{ value: tooltip || title }"
        active-class="app-list-item-active"
    >
        <slot name="icon">
            <Icon v-if="icon" :icon="icon" class="shrink-0"/>
        </slot>

        <slot>
            <div class="truncate">{{ title }}</div>
        </slot>
    </component>
</template>

<style scoped></style>
