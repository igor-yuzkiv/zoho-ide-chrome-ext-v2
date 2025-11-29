<script setup lang="ts">
import { ToggleThemeButton } from '@zoho-ide/shared'
import { useAppTheme } from '@zoho-ide/shared'

const appTheme = useAppTheme()
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <div class="absolute top-2 right-2">
            <ToggleThemeButton :is-dark="appTheme.isDark.value" @click="appTheme.toggle()" />
        </div>

        <router-view />
    </div>
</template>

<style scoped></style>
