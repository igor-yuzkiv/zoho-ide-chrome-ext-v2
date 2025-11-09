import { CapabilityType } from '@/config/capabilities.config.ts'
import { selectProviderRecordsQuery } from '@/core/cache'
import type { ICapabilityEntity } from '@/core/types/capability.types.ts'
import type { ServiceProvider } from '@/core/types/provider.types.ts'
import type { GlobalSearchDocument, GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import type { IModuleFieldMetadataEntity, IModuleMetadataEntity } from '@/capabilities/metadata/model/metadata.types.ts'

async function provideIndexDocuments<T extends ICapabilityEntity>(
    capabilityType: string,
    context?: Record<string, unknown>
): Promise<T[]> {
    if (!context || !context?.provider) {
        return []
    }

    const provider = context.provider as ServiceProvider

    return selectProviderRecordsQuery<T>(provider.id, capabilityType)
}

export const ModulesGlobalSearchModule: GlobalSearchModule = {
    name: CapabilityType.MODULES,
    provideIndexDocuments: async (context) => {
        const records = await provideIndexDocuments<IModuleMetadataEntity>(CapabilityType.MODULES, context)
        return records.map((i) => ({
            id: i.id,
            module: CapabilityType.MODULES,
            title: i.apiName,
            content: i.apiName,
        }))
    },
    icon: 'streamline-sharp:module',
    getNavigationRoute: (document: GlobalSearchDocument) => ({
        name: AppRouteName.workspaceModules,
        params: { moduleId: document.id },
    }),
}

export const FieldsGlobalSearchModule: GlobalSearchModule = {
    name: CapabilityType.FIELDS,
    provideIndexDocuments: async (context) => {
        const records = await provideIndexDocuments<IModuleFieldMetadataEntity>(CapabilityType.FIELDS, context)
        return records.map((i) => ({
            id: i.id,
            module: CapabilityType.FIELDS,
            title: `${i.moduleApiName} › ${i.apiName}`,
            content: [i.moduleApiName, i.moduleId, i.apiName, i.displayName, i.dataType].join(','),
        }))
    },
    icon: 'hugeicons:list-setting',
    getNavigationRoute: (document: GlobalSearchDocument) => {
        const parts = document.content.split(',')
        const moduleId = parts[1]
        if (moduleId) {
            return {
                name: AppRouteName.workspaceModules,
                params: { moduleId: moduleId },
            }
        }
    },
}
