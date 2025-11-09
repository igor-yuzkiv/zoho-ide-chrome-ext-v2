<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useProvidersStore } from '@/core/store/useProvidersStore.ts'

const providers = useProvidersStore()
const providerId = useRouteParams<string>('providerId')
const provider = computed(() => providers.findById(providerId.value))
</script>

<template>
    <div class="flex items-center justify-center w-full h-full bg-primary rounded-lg">
        <div v-if="provider" class="flex flex-col p-3">
            <div class="flex flex-col">
                <h3 class="text-gray-700 dark:text-gray-400">Service Provider</h3>
                <div class="flex items-center gap-x-2 text-2xl">
                    <Icon :icon="provider.serviceIcon" />
                    <h1 class="font-bold">{{ provider.title }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
