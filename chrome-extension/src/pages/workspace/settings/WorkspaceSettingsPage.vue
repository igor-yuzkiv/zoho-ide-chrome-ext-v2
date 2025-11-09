<script setup lang="ts">
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'

const { data: currentProvider } = useCurrentProvider()
</script>

<template>
    <div v-if="currentProvider" class="flex h-full w-full flex-col overflow-hidden bg-primary rounded-lg"></div>
</template>

<style scoped></style>
