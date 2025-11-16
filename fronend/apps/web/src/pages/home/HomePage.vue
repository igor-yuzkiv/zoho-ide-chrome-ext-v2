<script setup lang="ts">
import { AppRouteName } from "@/app/router/app-routes.ts";
</script>

<template>
    <div class="flex flex-col w-full h-full overflow-hidden p-1">
        <router-link :to="{ name: AppRouteName.users }" class="link">Users 1</router-link>
    </div>
</template>

<style scoped></style>
