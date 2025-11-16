<script setup lang="ts">
import type { TopMenuProps } from '../types.ts'

defineProps<TopMenuProps>()
</script>

<template>
    <div class="flex items-center gap-x-2 shrink-0">
        <router-link
            v-for="item in items"
            :key="item.title"
            :to="item.route"
            class="hover:underline hover:bg-primary px-3 rounded-lg"
        >
            {{ item.title }}
        </router-link>
    </div>
</template>

<style scoped></style>
