import { FunctionGlobalSearchModule } from '@/capabilities/function'
import { FieldsGlobalSearchModule, ModulesGlobalSearchModule } from '@/capabilities/metadata'
import { WorkflowGlobalSearchModule } from '@/capabilities/workflow'
import type { GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'

export const GlobalSearchModules: GlobalSearchModule[] = [
    FunctionGlobalSearchModule,
    WorkflowGlobalSearchModule,
    ModulesGlobalSearchModule,
    FieldsGlobalSearchModule,
]
