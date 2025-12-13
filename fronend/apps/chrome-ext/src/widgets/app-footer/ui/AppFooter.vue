<script setup lang="ts">
import { ToggleThemeButton } from '@zoho-ide/shared'
import { useAppThemeStore } from '@zoho-ide/shared'

const appTheme = useAppThemeStore()
</script>

<template>
    <footer class="flex w-full justify-between py-1 px-2">
        <div class="flex items-center gap-x-1">
            <slot name="start"></slot>
        </div>
        <div class="flex items-center justify-end gap-x-2">
            <slot name="end"></slot>
            <ToggleThemeButton :is-dark="appTheme.isDark" @click="appTheme.toggle" />
        </div>
    </footer>
</template>

<style scoped></style>
