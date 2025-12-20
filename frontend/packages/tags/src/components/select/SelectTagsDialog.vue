<script setup lang="ts">
import type { ITagEntity } from '../../types'
import TagsMultiSelect from './TagsMultiSelect.vue'
import Dialog from 'primevue/dialog'

const visible = defineModel('visible', { default: false })
const tags = defineModel<ITagEntity[]>('tags', { type: Array, default: () => [] })
</script>

<template>
    <Dialog v-model:visible="visible" modal :draggable="false" header="Select Tags" class="w-1/3">
        <TagsMultiSelect :model-value="tags" @update:model-value="tags = $event" />
    </Dialog>
</template>

<style scoped></style>
