<script setup lang="ts" generic="T extends ICapabilityEntity = ICapabilityEntity">
import type { ICapabilityEntity } from '@/core/types/capability.types.ts'
import CapabilityEntityListItem from '@/widgets/capability/capability-entities-list/ui/CapabilityEntityListItem.vue'

defineProps<{
    items: T[]
}>()

defineEmits<{
    (event: 'item:click', value: T): void
}>()
</script>

<template>
    <ul class="p-1">
        <li v-for="item in items" :key="item.id">
            <slot name="item" :item="item">
                <CapabilityEntityListItem :item="item" />
            </slot>
        </li>
    </ul>
</template>

<style scoped></style>
