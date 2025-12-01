<script setup lang="ts">
import TagChip from '../chip/TagChip.vue'
import { HexColorPicker } from '@zoho-ide/shared'
import { Button } from 'primevue'

defineEmits<{
    (event: 'create'): void
}>()
withDefaults(
    defineProps<{
        disabled?: boolean
    }>(),
    {
        disabled: false,
    }
)

const tagName = defineModel('name', { type: String, default: '' })
const tagColor = defineModel('color', { type: String, default: '002eff' })
</script>

<template>
    <div class="flex items-center justify-between">
        <TagChip :name="tagName" :color="tagColor" />

        <div class="flex items-center gap-x-2">
            <Button text @click="$emit('create')" :disabled="disabled">Create</Button>
            <HexColorPicker v-model="tagColor" />
        </div>
    </div>
</template>

<style scoped></style>
