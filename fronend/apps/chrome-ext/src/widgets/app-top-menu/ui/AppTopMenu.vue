<script setup lang="ts">
import { useAuthStore } from '@zoho-ide/shared'
import { TopMenu } from '@zoho-ide/shared'
import { type  TopMenuItem, UserProfile } from '@zoho-ide/shared'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'

const authStore = useAuthStore()
const router = useRouter()
const globalSearch = useGlobalSearch()
const { data: currentProvider } = useCurrentProvider()


const navItems = computed<TopMenuItem[]>(() => {
    const result: TopMenuItem[] = [{ title: 'Home', route: { name: AppRouteName.home } }]

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
        {
            title: 'Settings',
            route: {
                name: AppRouteName.workspaceSettings,
                params: { providerId: currentProvider.value.id },
            },
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
            @click="globalSearch.open()"
            class="fixed left-[45%] cursor-pointer flex items-center justify-center gap-x-2 bg-primary border rounded-lg w-64 hover:bg-gray-100 dark:hover:bg-black/60 text-sm dark:text-gray-300"
            v-tooltip.bottom="{ value: 'Search (Ctrl + K, ⌘ + K)' }"
        >
            <Icon icon="material-symbols:search" />
            <div class="truncate">{{ currentProvider?.title || 'Search' }}</div>
        </div>

        <template #right-content>
            <UserProfile :user="authStore.user" @sign-in="handleClickSignIn" @sign-out="handleSignOut" />
        </template>
    </TopMenu>
</template>

<style scoped></style>
