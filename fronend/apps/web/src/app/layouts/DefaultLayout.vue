<script setup lang="ts">
import type { TopMenuItem } from '@zoho-ide/ui-kit/components'
import { ToggleThemeButton, TopMenu } from '@zoho-ide/ui-kit/components'
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import { AppRouteName } from '@/app/router/app-routes.ts'

const NAV_ITEMS: TopMenuItem[] = [
    { title: 'Home', route: { name: AppRouteName.home } },
    { title: 'Users', route: { name: AppRouteName.usersIndex } },
]

const appTheme = useAppTheme()
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <div class="relative flex w-full shrink-0 justify-between overflow-hidden p-1">
            <TopMenu :items="NAV_ITEMS" />
        </div>

        <main class="flex h-full w-full flex-col overflow-hidden px-2">
            <slot />
        </main>

        <div class="flex items-center justify-end py-1 px-2">
            <ToggleThemeButton :is-dark="appTheme.isDark.value" @click="appTheme.toggle()" />
        </div>
    </div>
</template>

<style scoped></style>
