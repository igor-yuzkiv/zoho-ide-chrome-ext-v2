<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/shared'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { AppLayoutComponent } from '@/app/layouts/app-layouts.config.ts'

const route = useRoute()

const layoutComponent = computed(() => {
    const layoutName = route.meta?.layout
    if (layoutName && layoutName in AppLayoutComponent) {
        return AppLayoutComponent[layoutName]
    }

    return AppLayoutComponent.default
})

useAppTheme().initialize()
</script>

<template>
    <component :is="layoutComponent" />

    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
