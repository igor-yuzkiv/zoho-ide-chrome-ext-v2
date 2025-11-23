import { AppLayoutComponent } from '../app.layout.config.ts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useAppLayouts() {
    const route = useRoute()

    const layoutComponent = computed(() => {
        const layoutName = route.meta?.layout
        if (layoutName && layoutName in AppLayoutComponent) {
            return AppLayoutComponent[layoutName]
        }

        return AppLayoutComponent.default
    })

    return {
        layoutComponent,
    }
}
