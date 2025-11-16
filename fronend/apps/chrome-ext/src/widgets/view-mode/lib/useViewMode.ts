import { type Component, computed, ref } from 'vue'
import type { ViewModeOption } from '@/widgets/view-mode/lib/view-mode.type.ts'

export function useViewMode(options: ViewModeOption[], defaultMode: string) {
    const current = ref<string>(defaultMode)
    const currentOption = computed<ViewModeOption | undefined>(() => {
        return options.find((option) => option.value === current.value)
    })
    const currentComponent = computed<string | Component | undefined>(() => {
        return currentOption.value?.component
    })

    return {
        options,
        current,
        currentOption,
        currentComponent,
    }
}
