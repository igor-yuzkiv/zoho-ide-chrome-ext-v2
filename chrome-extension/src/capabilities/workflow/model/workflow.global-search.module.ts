import { CapabilityType } from '@/config/capabilities.config.ts'
import { selectProviderRecordsQuery } from '@/core/cache'
import type { ServiceProvider } from '@/core/types/provider.types.ts'
import type { GlobalSearchDocument, GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import type { IWorkflowEntity } from '@/capabilities/workflow/model/workflow.types.ts'

async function provideIndexDocuments(context?: Record<string, unknown>): Promise<GlobalSearchDocument[]> {
    if (!context || !context?.provider) {
        return []
    }

    const provider = context.provider as ServiceProvider

    const records = await selectProviderRecordsQuery<IWorkflowEntity>(provider.id, CapabilityType.WORKFLOWS)
    if (!records.length) {
        return []
    }

    return records.map((i) => ({
        id: i.id,
        module: CapabilityType.WORKFLOWS,
        title: i.displayName,
        content: i.description || '',
    }))
}

export const WorkflowGlobalSearchModule: GlobalSearchModule = {
    name: CapabilityType.WORKFLOWS,
    provideIndexDocuments,
    icon: 'mdi:workflow',
    getNavigationRoute: (document: GlobalSearchDocument) => ({
        name: AppRouteName.workspaceWorkflows,
        params: { workflowId: document.id },
    }),
}
