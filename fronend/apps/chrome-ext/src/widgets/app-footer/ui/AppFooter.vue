<script setup lang="ts">
import { ToggleThemeButton } from '@zoho-ide/ui-kit/components'
import { useAppTheme } from '@zoho-ide/ui-kit/composables'

const appTheme = useAppTheme()
</script>

<template>
    <footer class="flex w-full justify-between py-1 px-2">
        <div class="flex items-center gap-x-1">
            <slot name="before"></slot>
        </div>
        <div class="flex items-center justify-end gap-x-2">
            <ToggleThemeButton :is-dark="appTheme.isDark.value" @click="appTheme.toggle()" />
        </div>
    </footer>
</template>

<style scoped></style>
