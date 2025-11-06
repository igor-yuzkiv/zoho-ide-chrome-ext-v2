<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import type { ProviderCapability } from '@/core/types/capability.types.ts'

const props = defineProps<{
    providerId: string
    capabilities: ProviderCapability[]
}>()

const route = useRoute()

const itemsForDisplay = computed(() => {
    return props.capabilities.map((c) => ({
        ...c,
        isActive: route.path.includes(c.type),
    }))
})
</script>

<template>
    <ul>
        <li
            v-for="capability in itemsForDisplay"
            :key="capability.type"
            v-tooltip="{ value: capability.title }"
            class="p-2"
        >
            <router-link
                :to="`/workspace/${providerId}/${capability.type}`"
                class="hover:bg-selection flex cursor-pointer items-center justify-center p-2 rounded-lg"
                :class="{ 'app-list-item-active': capability.isActive }"
            >
                <Icon :icon="capability.icon" class="h-4 w-4" />
            </router-link>
        </li>
    </ul>
</template>

<style scoped></style>
