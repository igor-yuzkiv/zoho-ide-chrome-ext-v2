<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { useAppThemeStore } from '@zoho-ide/ui-kit'
import { AppLayoutComponent } from '@/app/layouts/app-layouts.config.ts'

const route = useRoute()

const layoutComponent = computed(() => {
    const layoutName = route.meta?.layout
    if (layoutName && layoutName in AppLayoutComponent) {
        return AppLayoutComponent[layoutName]
    }

    return AppLayoutComponent.default
})

useAppThemeStore().initialize()
</script>

<template>
    <component :is="layoutComponent" />

    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
