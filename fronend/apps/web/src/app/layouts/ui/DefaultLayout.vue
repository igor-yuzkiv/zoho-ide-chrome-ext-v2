<script setup lang="ts">
import { useAuthStore } from '@zoho-ide/backend-api/auth'
import { type TopMenuItem } from '@zoho-ide/ui-kit/components'
import { UserProfile } from '@zoho-ide/ui-kit/widgets'
import { ToggleThemeButton, TopMenu } from '@zoho-ide/ui-kit/components'
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import { useRoute, useRouter } from 'vue-router'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { AppRouteName } from '@/app/router/app-routes.ts'

const NAV_ITEMS: TopMenuItem[] = [
    { title: 'Home', route: { name: AppRouteName.home } },
    { title: 'Users', route: { name: AppRouteName.usersIndex } },
    { title: 'Knowledge Base', route: { name: AppRouteName.kbIndex } },
]

const appTheme = useAppTheme()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

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
            <Splitter
                class="flex h-full w-full overflow-hidden bg-transparent"
                :pt="{ gutter: { class: 'bg-transparent' } }"
            >
                <SplitterPanel
                    v-if="!route.meta?.hideSidebarMenu"
                    class="flex h-full overflow-hidden w-full"
                    :size="5"
                    style="min-width: 10rem; max-width: 50rem"
                >
                    <div class="flex flex-col w-full h-full overflow-hidden app-card">
                        <router-view name="menu" />
                    </div>
                </SplitterPanel>
                <SplitterPanel class="flex flex-col w-full h-full overflow-hidden">
                    <router-view />
                </SplitterPanel>
            </Splitter>
        </main>

        <div class="flex items-center justify-end py-1 px-2">
            <ToggleThemeButton :is-dark="appTheme.isDark.value" @click="appTheme.toggle()" />
        </div>
    </div>
</template>

<style scoped></style>
