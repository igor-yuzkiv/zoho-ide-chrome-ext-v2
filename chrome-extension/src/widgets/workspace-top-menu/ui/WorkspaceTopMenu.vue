<script setup lang="ts">
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'

const globalSearch = useGlobalSearch()

const props = defineProps<{
    provider: ServiceProvider
}>()

const navItems = computed(() => {
    return [
        { title: 'Home', route: '/' },
        { title: 'Dashboard', route: { name: AppRouteName.workspaceIndex, params: { providerId: props.provider.id } } },
        { title: 'Settings', route: { name: AppRouteName.workspaceSettings, params: { providerId: props.provider.id } } },
    ]
})
</script>

<template>
    <div class="relative flex w-full shrink-0 justify-between overflow-hidden">
        <div class="flex items-center gap-x-2 shrink-0">
            <router-link
                v-for="item in navItems"
                :key="item.title"
                :to="item.route"
                class="hover:underline hover:bg-primary px-2"
            >
                {{ item.title }}
            </router-link>
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
