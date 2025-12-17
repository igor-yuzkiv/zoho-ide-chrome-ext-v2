import type { GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { FunctionGlobalSearchModule } from '@/features/function-capability'
import { FieldsGlobalSearchModule, ModulesGlobalSearchModule } from '@/features/metadata-capability'
import { WorkflowGlobalSearchModule } from '@/features/workflow-capability'

export const GlobalSearchModules: GlobalSearchModule[] = [
    FunctionGlobalSearchModule,
    WorkflowGlobalSearchModule,
    ModulesGlobalSearchModule,
    FieldsGlobalSearchModule,
]
