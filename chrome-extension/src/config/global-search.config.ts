import type { GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { FunctionGlobalSearchModule } from '@/capabilities/function/model/function.global-search.module.ts'
import {
    FieldsGlobalSearchModule,
    ModulesGlobalSearchModule,
} from '@/capabilities/metadata/model/metadata.global-search.module.ts'
import { WorkflowGlobalSearchModule } from '@/capabilities/workflow/model/workflow.global-search.module.ts'

export const GlobalSearchModules: GlobalSearchModule[] = [
    FunctionGlobalSearchModule,
    WorkflowGlobalSearchModule,
    ModulesGlobalSearchModule,
    FieldsGlobalSearchModule,
]
