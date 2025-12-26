import { capabilityRecordsStorageFactory, ProviderCapabilityType } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import type { IFunctionRecordEntity } from '@zoho-ide/shared'
import { defineAsyncComponent } from 'vue'
import type { GlobalSearchDocument, GlobalSearchModule } from '@/modules/global-search/global-search.types.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

async function provideIndexDocuments(context?: Record<string, unknown>): Promise<GlobalSearchDocument[]> {
    if (!context || !context?.provider) {
        return []
    }

    const provider = context.provider as ZohoServiceProvider

    const records = await localCapabilityStorage.findByProviderIdAndCapabilityType<IFunctionRecordEntity>(
        provider.id,
        ProviderCapabilityType.FUNCTIONS
    )
    if (!records.length) {
        return []
    }

    return records.map((i) => ({
        id: i.id,
        module: ProviderCapabilityType.FUNCTIONS,
        title: i.display_name,
        content: i.script || '',
    }))
}

export const FunctionGlobalSearchModule: GlobalSearchModule = {
    name: ProviderCapabilityType.FUNCTIONS,
    provideIndexDocuments,
    icon: 'material-symbols:function',
    getNavigationRoute: (document: GlobalSearchDocument) => ({
        name: AppRouteName.workspaceFunctions,
        params: { functionId: document.id },
    }),
    previewComponent: defineAsyncComponent(() => import('./FunctionGlobalSearchPreview.vue')),
}
