export { default as ModuleTableView } from './components/detail-view/ModuleTableView.vue'
export { default as ModuleJsonView } from './components/detail-view/ModuleJsonView.vue'

export { useModuleDetails } from './composables/useModuleDetails.ts'
export { useModuleFields } from './composables/useModuleFields.ts'

export {
    ModulesGlobalSearchModule,
    FieldsGlobalSearchModule,
} from '@/modules/capabilities/metadata/search/metadata.global-search.module.ts'
