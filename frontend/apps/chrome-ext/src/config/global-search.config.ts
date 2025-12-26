import { FunctionGlobalSearchModule } from '@/modules/capabilities/functions'
import { FieldsGlobalSearchModule, ModulesGlobalSearchModule } from '@/modules/capabilities/metadata'
import { WorkflowGlobalSearchModule } from '@/modules/capabilities/workflows'
import type { GlobalSearchModule } from '@/modules/global-search/global-search.types.ts'

export const GlobalSearchModules: GlobalSearchModule[] = [
    FunctionGlobalSearchModule,
    WorkflowGlobalSearchModule,
    ModulesGlobalSearchModule,
    FieldsGlobalSearchModule,
]
