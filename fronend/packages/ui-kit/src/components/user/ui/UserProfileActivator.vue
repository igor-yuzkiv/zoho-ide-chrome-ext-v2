<script setup lang="ts">
import type { Component } from 'vue'
import { Icon } from '@iconify/vue'

withDefaults(
    defineProps<{
        userName?: string
        as?: string | Component
    }>(),
    {
        as: 'div',
    }
)
</script>

<template>
    <component :is="as" class="flex items-center gap-x-1 pr-2 hover:underline cursor-pointer">
        <div>
            {{ userName ? userName : 'Login' }}
        </div>
        <Icon v-if="userName" class="text-2xl" :icon="'mdi:account-circle'" />
    </component>
</template>

<style scoped></style>
