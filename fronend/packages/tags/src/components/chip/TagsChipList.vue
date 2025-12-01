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
        inline?: boolean
    }>(),
    {
        tags: () => [],
        itemClass: '',
        showCloseIcon: false,
        inline: false,
    }
)
</script>

<template>
    <div class="tags-chip-list" :class="inline ? 'tags-chip-list-inline' : ''">
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

<style scoped>
.tags-chip-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.tags-chip-list-inline {
    flex-wrap: nowrap;
    overflow-x: auto;
}

*::-webkit-scrollbar {
    width: 3px !important;
    height: 3px !important;
}
</style>
