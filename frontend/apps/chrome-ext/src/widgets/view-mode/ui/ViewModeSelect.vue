<script setup lang="ts">
import { startCase } from 'lodash'
import { computed } from 'vue'
import Select from 'primevue/select'
import { Icon } from '@iconify/vue'
import type { ViewModeOption } from '@/widgets/view-mode/lib/view-mode.type.ts'

const props = defineProps<{ options: ViewModeOption[] }>()
const modelValue = defineModel<string>()

const optionsForDisplay = computed(() => {
    return props.options.map((o) => ({ ...o, label: o?.label || startCase(o.value) }))
})

const currentOption = computed<ViewModeOption | undefined>(() => {
    return props.options.find((o) => o.value === modelValue.value)
})
</script>

<template>
    <Select
        class="border-none bg-transparent shadow-none"
        :options="optionsForDisplay"
        v-model="modelValue"
        option-label="label"
        option-value="value"
    >
        <template #dropdownicon>
            <Icon :icon="currentOption?.icon || 'iconoir:view-grid'" class="w-6 h-6" />
        </template>
    </Select>
</template>

<style scoped></style>
