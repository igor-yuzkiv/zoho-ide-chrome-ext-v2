<script setup lang="ts">
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useAppThemeStore } from "@/app/store/useAppThemeStore.ts";

const appTheme = useAppThemeStore();

appTheme.bootstrap();
</script>

<template>
    <div
        class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden"
    >
        <router-view></router-view>
    </div>

    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
