import { capabilityRecordsStorageFactory, ProviderCapabilityType } from '@zoho-ide/shared'
import type { IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import type { IModuleFieldMetadataRecordEntity, IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import type { GlobalSearchDocument, GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

async function provideIndexDocuments<T extends IBaseCapabilityRecordEntity>(
    capabilityType: string,
    context?: Record<string, unknown>
): Promise<T[]> {
    if (!context || !context?.provider) {
        return []
    }

    const provider = context.provider as ZohoServiceProvider

    return localCapabilityStorage.findByProviderIdAndCapabilityType<T>(provider.id, capabilityType)
}

export const ModulesGlobalSearchModule: GlobalSearchModule = {
    name: ProviderCapabilityType.MODULES,
    icon: 'streamline-sharp:module',
    provideIndexDocuments: async (context) => {
        const records = await provideIndexDocuments<IModuleMetadataRecordEntity>(
            ProviderCapabilityType.MODULES,
            context
        )
        return records.map((i) => ({
            id: i.id,
            module: ProviderCapabilityType.MODULES,
            title: i.api_name,
            content: i.api_name,
        }))
    },
    getNavigationRoute: (document: GlobalSearchDocument) => ({
        name: AppRouteName.workspaceModules,
        params: { moduleId: document.id },
    }),
}

export const FieldsGlobalSearchModule: GlobalSearchModule = {
    name: ProviderCapabilityType.FIELDS,
    icon: 'hugeicons:list-setting',
    provideIndexDocuments: async (context) => {
        const records = await provideIndexDocuments<IModuleFieldMetadataRecordEntity>(
            ProviderCapabilityType.FIELDS,
            context
        )
        return records.map((i) => ({
            id: i.id,
            module: ProviderCapabilityType.FIELDS,
            title: `${i.module_api_name} › ${i.api_name}`,
            content: [i.module_api_name, i.module_id, i.api_name, i.display_name, i.data_type].join(','),
        }))
    },
    getNavigationRoute(document: GlobalSearchDocument) {
        const parts = document.content.split(',')
        const moduleId = parts[1]
        if (!moduleId) {
            return
        }

        return {
            name: AppRouteName.workspaceModules,
            params: { moduleId: moduleId },
        }
    },
}
