<script setup lang="ts">
import UserProfileActivator from './UserProfileActivator.vue'
import type { IUser } from '@zoho-ide/shared/entities/user'
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
    user: IUser | null
    loginRoute: RouteLocationRaw
    profileRoute: RouteLocationRaw
}>()
</script>

<template>
    <UserProfileActivator :user-name="user?.name" as="router-link" :to="user ? profileRoute : loginRoute" />
</template>

<style scoped></style>
