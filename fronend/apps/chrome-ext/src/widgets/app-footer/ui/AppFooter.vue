<script setup lang="ts">
import { IconButton } from '@/shared/components/button'
import { useAppTheme } from '@zoho-ide/ui-kit/composables'

const appTheme = useAppTheme()

</script>

<template>
    <footer class="flex w-full justify-between p-1 px-2">
        <div class="flex items-center gap-x-1">
            <slot name="before"></slot>
        </div>
        <div class="flex items-center justify-end gap-x-2">
            <IconButton
                class="p-0"
                text
                :icon="appTheme.isDark ? 'ix:light-dark' : 'circum:dark'"
                size="small"
                @click="appTheme.toggle()"
            />
        </div>
    </footer>
</template>

<style scoped></style>
