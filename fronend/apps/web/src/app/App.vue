<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { useAppLayouts } from '@/app/layouts'

const { layoutComponent } = useAppLayouts()
useAppTheme().initialize()
</script>

<template>
    <component :is="layoutComponent">
        <router-view />
    </component>

    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
