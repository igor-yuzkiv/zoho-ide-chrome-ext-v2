// router.d.ts
import 'vue-router'
import type { AppLayoutName } from '@/app/layouts/app-layouts.config.ts'

declare module 'vue-router' {
    interface RouteMeta {
        layout?: AppLayoutName
        authenticated?: boolean
        hideSidebarMenu?: boolean
    }
}
