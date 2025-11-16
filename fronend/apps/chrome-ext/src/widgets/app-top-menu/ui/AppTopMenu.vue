<script setup lang="ts">
import { TopMenu } from '@zoho-ide/ui-kit/components'
import type { TopMenuItem } from '@zoho-ide/ui-kit/components'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'

const globalSearch = useGlobalSearch()
const { data: currentProvider } = useCurrentProvider()

const navItems = computed<TopMenuItem[]>(() => {
    const result: TopMenuItem[] = [{ title: 'Home', route: { name: AppRouteName.home } }]

    if (!currentProvider.value) {
        return result
    }

    return result.concat([
        {
            title: 'Dashboard',
            route: { name: AppRouteName.workspaceIndex, params: { providerId: currentProvider.value.id } },
        },
        {
            title: 'Settings',
            route: {
                name: AppRouteName.workspaceSettings,
                params: { providerId: currentProvider.value.id },
            },
        },
    ])
})
</script>

<template>
    <div class="relative flex w-full shrink-0 justify-between overflow-hidden pt-1 px-1">
        <TopMenu :items="navItems" />

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
