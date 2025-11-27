<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
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
