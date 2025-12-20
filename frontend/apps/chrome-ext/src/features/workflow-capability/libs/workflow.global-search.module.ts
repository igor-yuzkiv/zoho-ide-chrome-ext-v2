import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import type { GlobalSearchDocument, GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'

async function provideIndexDocuments(context?: Record<string, unknown>): Promise<GlobalSearchDocument[]> {
    if (!context || !context?.provider) {
        return []
    }

    const provider = context.provider as ZohoServiceProvider

    const records = await selectProviderRecordsQuery<IWorkflowRecordEntity>(
        provider.id,
        ProviderCapabilityType.WORKFLOWS
    )
    if (!records.length) {
        return []
    }

    return records.map((i) => ({
        id: i.id,
        module: ProviderCapabilityType.WORKFLOWS,
        title: i.display_name,
        content: i.description || '',
    }))
}

export const WorkflowGlobalSearchModule: GlobalSearchModule = {
    name: ProviderCapabilityType.WORKFLOWS,
    provideIndexDocuments,
    icon: 'mdi:workflow',
    getNavigationRoute: (document: GlobalSearchDocument) => ({
        name: AppRouteName.workspaceWorkflows,
        params: { workflowId: document.id },
    }),
}
