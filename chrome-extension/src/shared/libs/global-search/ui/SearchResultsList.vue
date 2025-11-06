<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGlobalSearchSettings } from '@/shared/libs/global-search/lib/composables/useGlobalSearchSettings.ts'
import type { GlobalSearchDocument } from '@/shared/libs/global-search/lib/global-search.types.ts'

const props = defineProps<{
    results: GlobalSearchDocument[]
    selectedItemId?: string
}>()
const globalSearchSettings = useGlobalSearchSettings()

defineEmits<{
    (event: 'item:view', value: GlobalSearchDocument): void
    (event: 'item:click', value: GlobalSearchDocument): void
}>()

const itemsForDisplay = computed(() => {
    if (!props.results.length) {
        return []
    }
    return props.results.map((result) => {
        const module = globalSearchSettings.findModuleByName(result.module)
        return {
            ...result,
            icon: module?.icon || 'streamline-flex:module-puzzle-2-solid',
            selected: result.id === props.selectedItemId,
        }
    })
})
</script>

<template>
    <ul>
        <li
            v-for="result in itemsForDisplay"
            :key="result.id"
            class="flex w-full cursor-pointer items-center rounded hover:bg-selection px-1 justify-between group"
            @click="$emit('item:click', result)"
            :class="{ 'app-list-item-active': result.selected }"
        >
            <div class="flex items-center gap-x-2">
                <Icon :icon="result.icon" />
                {{ result.title }}
            </div>

            <div class="flex items-center gap-x-2">
                <div
                    class="text-sm text-primary hover:underline opacity-0 group-hover:opacity-100 cursor-pointer"
                    @click.stop="$emit('item:view', result)"
                >
                    View
                </div>
                <div class="text-sm text-gray-500" :class="result.selected ? 'text-white' : ''">
                    {{ result.module }}
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped></style>
