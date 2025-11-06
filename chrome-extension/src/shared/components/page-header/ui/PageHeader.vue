<script setup lang="ts">
defineProps<{
    title?: string
    description?: string
}>()
</script>

<template>
    <div class="flex items-center justify-between bg-background p-1 rounded-lg px-2">
        <div class="flex flex-col leading-6">
            <h1 class="font-bold">
                <slot name="title">{{ title }}</slot>
            </h1>
            <p class="text-gray-500 text-xs">
                <slot name="description">{{ description }}</slot>
            </p>
        </div>

        <div class="flex items-center gap-x-1">
            <slot name="actions" />
        </div>
    </div>
</template>

<style scoped></style>
