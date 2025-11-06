<script setup lang="ts">
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'

defineProps<{
    icon: string
    size?: 'small' | 'large'
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
    text?: boolean
}>()
</script>

<template>
    <Button :size="size" :text="text" :severity="severity || 'secondary'">
        <template #icon>
            <Icon :icon="icon" />
        </template>
    </Button>
</template>

<style scoped></style>
