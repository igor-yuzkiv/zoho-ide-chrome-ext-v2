<script setup lang="ts">
import type { ITagEntity } from '../../types'
import TagChip from './TagChip.vue'

defineEmits<{
    (event: 'item:click', tag: ITagEntity): void
    (event: 'item:close', tag: ITagEntity): void
}>()

withDefaults(
    defineProps<{
        tags: ITagEntity[]
        itemClass?: string
        showCloseIcon?: boolean
    }>(),
    {
        tags: () => [],
        itemClass: '',
        showCloseIcon: false,
    }
)
</script>

<template>
    <div class="flex gap-1" style="flex-wrap: wrap">
        <TagChip
            class="shrink-0"
            v-for="tag in tags"
            :key="tag.id"
            :color="tag.color"
            :name="tag.name"
            :class="itemClass"
            :show-close-icon="showCloseIcon"
            @close="$emit('item:close', tag)"
            @click="$emit('item:click', tag)"
        />
    </div>
</template>

<style scoped></style>
