<script setup lang="ts">
import type { TopMenuProps } from '../types.ts'

defineProps<TopMenuProps>()
</script>

<template>
    <div class="relative flex w-full justify-between overflow-hidden p-1">
        <div class="flex items-center gap-x-2 shrink-0">
            <router-link
                v-for="item in items"
                :key="item.title"
                :to="item.route"
                class="hover:underline hover:bg-primary px-3 rounded-lg"
                active-class="app-list-item-active"
            >
                {{ item.title }}
            </router-link>
        </div>

        <slot />

        <slot name="right-content"></slot>
    </div>
</template>

<style scoped></style>
