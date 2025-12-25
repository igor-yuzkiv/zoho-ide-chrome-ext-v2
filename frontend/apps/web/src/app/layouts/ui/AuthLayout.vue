<script setup lang="ts">
import { ToggleThemeButton, useAppThemeStore } from '@zoho-ide/ui-kit'

const appTheme = useAppThemeStore()
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <div class="absolute top-2 right-2">
            <ToggleThemeButton :is-dark="appTheme.isDark" @click="appTheme.toggle()" />
        </div>

        <router-view />
    </div>
</template>

<style scoped></style>
