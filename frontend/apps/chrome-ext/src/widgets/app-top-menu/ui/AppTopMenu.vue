<script setup lang="ts">
import { useCurrentProvider } from '@/core/provider'
import { useGlobalSearch } from '@/modules/global-search'
import { useAuthStore } from '@zoho-ide/shared'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { TopMenu, type TopMenuItemProps, UserProfile } from '@zoho-ide/ui-kit'
import { AppRouteName } from '@/app/router/app-routes.ts'

const authStore = useAuthStore()
const router = useRouter()
const globalSearch = useGlobalSearch()
const { data: currentProvider } = useCurrentProvider()

const navItems = computed<TopMenuItemProps[]>(() => {
    const result: TopMenuItemProps[] = [
        { title: 'Home', route: { name: AppRouteName.home } },
        { title: 'Settings', route: { name: AppRouteName.settingsIndex } },
    ]

    if (authStore.isAuthenticated) {
        result.push({ title: 'Knowledge Base', route: { name: AppRouteName.knowledgeBaseIndex } })
    }

    if (!currentProvider.value) {
        return result
    }

    return result.concat([
        {
            title: currentProvider.value.title,
            route: { name: AppRouteName.workspaceIndex, params: { providerId: currentProvider.value.id } },
        },
    ])
})

function handleClickSignIn() {
    router.push({ name: AppRouteName.login })
}

function handleSignOut() {
    authStore.logout()
    router.push({ name: AppRouteName.login })
}
</script>

<template>
    <TopMenu :items="navItems" class="relative">
        <div
            v-if="currentProvider"
            @click="globalSearch.open()"
            class="fixed left-[45%] cursor-pointer flex items-center justify-center gap-x-2 bg-primary border rounded-lg w-64 hover:bg-gray-100 dark:hover:bg-black/60 text-sm dark:text-gray-300"
            v-tooltip.bottom="{ value: 'Search (Ctrl + K, ⌘ + K)' }"
        >
            <Icon icon="material-symbols:search" />
            <div class="truncate">{{ currentProvider?.title || 'Search' }}</div>
        </div>

        <template #right-content>
            <div class="flex items-center gap-x-2">
                <slot name="right-content" />
                <UserProfile :user="authStore.user" @sign-in="handleClickSignIn" @sign-out="handleSignOut" />
            </div>
        </template>
    </TopMenu>
</template>

<style scoped></style>
