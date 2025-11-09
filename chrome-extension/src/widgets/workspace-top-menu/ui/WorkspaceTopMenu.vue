<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useGlobalSearch } from '@/shared/libs/global-search'
import type { ServiceProvider } from '@/core/types/provider.types.ts'

const globalSearch = useGlobalSearch()

defineProps<{
    provider: ServiceProvider
}>()
</script>

<template>
    <div class="relative flex w-full shrink-0 justify-between overflow-hidden">
        <div class="flex items-center gap-x-2 shrink-0">
            <router-link to="/" class="hover:underline">Home</router-link>
        </div>

        <div
            @click="globalSearch.open()"
            class="cursor-pointer flex items-center justify-center gap-x-2 bg-primary border px-2 rounded-lg w-64 hover:bg-gray-100 dark:hover:bg-black/60 text-sm dark:text-gray-300"
            v-tooltip.bottom="{ value: 'Search (Ctrl + K, ⌘ + K)' }"
        >
            <Icon icon="material-symbols:search" />
            <div class="truncate">{{ provider.title }}</div>
        </div>

        <div class="flex items-center gap-x-2"></div>
    </div>
</template>

<style scoped></style>
