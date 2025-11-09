<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'

const globalSearch = useGlobalSearch()
const { data: currentProvider } = useCurrentProvider()

const navItems = computed(() => {
    const result = [{ title: 'Home', route: '/' }]
    if (!currentProvider.value) {
        return result
    }

    return [
        ...result,
        {
            title: 'Dashboard',
            route: { name: AppRouteName.workspaceIndex, params: { providerId: currentProvider.value.id } },
        },
        {
            title: 'Settings',
            route: { name: AppRouteName.workspaceSettings, params: { providerId: currentProvider.value.id } },
        },
    ]
})
</script>

<template>
    <div class="relative flex w-full shrink-0 justify-between overflow-hidden pt-1 px-1">
        <div class="flex items-center gap-x-2 shrink-0">
            <router-link
                v-for="item in navItems"
                :key="item.title"
                :to="item.route"
                class="hover:underline hover:bg-primary px-3 rounded-lg"
            >
                {{ item.title }}
            </router-link>
        </div>

        <div
            @click="globalSearch.open()"
            class="fixed left-[45%] cursor-pointer flex items-center justify-center gap-x-2 bg-primary border rounded-lg w-64 hover:bg-gray-100 dark:hover:bg-black/60 text-sm dark:text-gray-300"
            v-tooltip.bottom="{ value: 'Search (Ctrl + K, ⌘ + K)' }"
        >
            <Icon icon="material-symbols:search" />
            <div class="truncate">{{ currentProvider?.title || 'Search' }}</div>
        </div>

        <div class="flex items-center gap-x-1 pr-2 hover:underline cursor-pointer">
            <div>Igor Yuzkiv</div>
            <Icon class="text-2xl" :icon="'mdi:account-circle'" />
        </div>
    </div>
</template>

<style scoped></style>
