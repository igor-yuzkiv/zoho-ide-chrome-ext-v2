import { CapabilityType } from '@/config/capabilities.config.ts'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'
import { defineAsyncComponent } from 'vue'
import type { GlobalSearchDocument, GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import type { IFunctionEntity } from '@/capabilities/function/function.types.ts'

async function provideIndexDocuments(context?: Record<string, unknown>): Promise<GlobalSearchDocument[]> {
    if (!context || !context?.provider) {
        return []
    }

    const provider = context.provider as ServiceProvider

    const records = await selectProviderRecordsQuery<IFunctionEntity>(provider.id, CapabilityType.FUNCTIONS)
    if (!records.length) {
        return []
    }

    return records.map((i) => ({
        id: i.id,
        module: CapabilityType.FUNCTIONS,
        title: i.displayName,
        content: i.script || '',
    }))
}

export const FunctionGlobalSearchModule: GlobalSearchModule = {
    name: CapabilityType.FUNCTIONS,
    provideIndexDocuments,
    icon: 'material-symbols:function',
    getNavigationRoute: (document: GlobalSearchDocument) => ({
        name: AppRouteName.workspaceFunctions,
        params: { functionId: document.id },
    }),
    previewComponent: defineAsyncComponent(
        () => import('../components/FunctionGlobalSearchPreview.vue')
    ),
}
