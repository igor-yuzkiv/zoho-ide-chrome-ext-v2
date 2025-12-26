<script setup lang="ts">
import { useGlobalSearchSettings } from '@/modules/global-search/composables/useGlobalSearchSettings.ts'
import type { GlobalSearchDocument } from '@/modules/global-search/global-search.types.ts'
import { computed } from 'vue'
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'

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
                <Button
                    text
                    class="text-sm opacity-0 group-hover:opacity-100 py-0 px-2"
                    @click.stop="$emit('item:view', result)"
                >
                    View
                </Button>
                <div class="text-sm text-gray-500" :class="result.selected ? 'text-white' : ''">
                    {{ result.module }}
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped></style>
