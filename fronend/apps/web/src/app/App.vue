<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

useAppTheme().initialize()
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <router-view></router-view>
    </div>

    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
