<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<template>
    <div class="relative flex h-screen w-full flex-col overflow-hidden">
        <router-view></router-view>
    </div>

    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
