<script setup lang="ts">
import { useAuthStore } from '@zoho-ide/backend-api/auth'
import { type TopMenuItem, UserProfile } from '@zoho-ide/ui-kit/components'
import { ToggleThemeButton, TopMenu } from '@zoho-ide/ui-kit/components'
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import { useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

const NAV_ITEMS: TopMenuItem[] = [
    { title: 'Home', route: { name: AppRouteName.home } },
    { title: 'Users', route: { name: AppRouteName.usersIndex } },
]

const appTheme = useAppTheme()
const authStore = useAuthStore()
const router = useRouter()

function handleClickSignIn() {
    router.push({ name: AppRouteName.login })
}

function handleSignOut() {
    authStore.logout()
    router.push({ name: AppRouteName.login })
}
</script>

<template>
    <div class="bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <TopMenu :items="NAV_ITEMS">
            <template #right-content>
                <UserProfile :user="authStore.user" @sign-in="handleClickSignIn" @sign-out="handleSignOut" />
            </template>
        </TopMenu>

        <main class="flex h-full w-full flex-col overflow-hidden px-2">
            <slot />
        </main>

        <div class="flex items-center justify-end py-1 px-2">
            <ToggleThemeButton :is-dark="appTheme.isDark.value" @click="appTheme.toggle()" />
        </div>
    </div>
</template>

<style scoped></style>
