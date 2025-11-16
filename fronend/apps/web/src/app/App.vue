<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit'

useAppTheme().initialize();
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <router-view />
    </div>
</template>

<style scoped lang="css"></style>
