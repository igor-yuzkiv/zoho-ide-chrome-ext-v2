import type { GlobalSearchModule } from '@/modules/global-search/global-search.types.ts'
import { FunctionGlobalSearchModule } from '@/modules/capabilities/functions'
import { FieldsGlobalSearchModule, ModulesGlobalSearchModule } from '@/modules/capabilities/metadata'
import { WorkflowGlobalSearchModule } from '@/modules/capabilities/workflows'

export const GlobalSearchModules: GlobalSearchModule[] = [
    FunctionGlobalSearchModule,
    WorkflowGlobalSearchModule,
    ModulesGlobalSearchModule,
    FieldsGlobalSearchModule,
]
