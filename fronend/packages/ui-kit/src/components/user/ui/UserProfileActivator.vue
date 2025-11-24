<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
    userName?: string
}>()
</script>

<template>
    <div class="flex items-center gap-x-1 pr-2 hover:underline cursor-pointer">
        <div>
            {{ userName ? userName : 'Login' }}
        </div>
        <Icon v-if="userName" class="text-2xl" :icon="'mdi:account-circle'" />
    </div>
</template>

<style scoped></style>
