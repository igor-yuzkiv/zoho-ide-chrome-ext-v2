<script setup lang="ts">
import { Tag } from 'primevue'
import { Icon } from '@iconify/vue'

defineEmits<(event: 'close') => void>()
withDefaults(
    defineProps<{
        name: string
        color?: string
        showCloseIcon?: boolean
    }>(),
    {
        color: '#002aff',
        showCloseIcon: false,
    }
)
</script>

<template>
    <Tag :style="{ backgroundColor: color, color: 'white' }" class="truncate whitespace-nowrap" :title="name">
        <span class="truncate">{{ name }}</span>
        <button v-if="showCloseIcon" class="cursor-pointer" @click="$emit('close')">
            <Icon icon="material-symbols:close-rounded" class="h-5 w-5" />
        </button>
    </Tag>
</template>

<style scoped></style>
