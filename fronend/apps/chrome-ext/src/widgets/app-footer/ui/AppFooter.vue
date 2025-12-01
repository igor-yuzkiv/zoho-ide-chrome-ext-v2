<script setup lang="ts">
import { IconButton, ToggleThemeButton } from '@zoho-ide/shared'
import { useAppThemeStore } from '@zoho-ide/shared'

const appTheme = useAppThemeStore()
</script>

<template>
    <footer class="flex w-full justify-between py-1 px-2">
        <div class="flex items-center gap-x-1">
            <slot name="before"></slot>
        </div>
        <div class="flex items-center justify-end gap-x-2">
            <IconButton icon="carbon:ibm-watson-knowledge-catalog" text size="small" class="p-0" />
            <ToggleThemeButton :is-dark="appTheme.isDark" @click="appTheme.toggle" />
        </div>
    </footer>
</template>

<style scoped></style>
