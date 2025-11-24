<script setup lang="ts">
import UserProfileActivator from './UserProfileActivator.vue'

defineProps<{
    userName?: string
    userEmail?: string
}>()

</script>

<template>
    <UserProfileActivator is-authenticated="" />
</template>

<style scoped></style>
