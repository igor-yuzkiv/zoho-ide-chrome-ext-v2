import { WorkflowSchemaBuilderRegister } from '@/config/workflows.config.ts'
import type { Edge, Node } from '@vue-flow/core'
import { ref } from 'vue'
import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import type { Maybe } from '@/shared/types/result.types.ts'
import type { IWorkflowEntity, WorkflowSchemaBuilder } from '@/capabilities/workflow/workflow.types.ts'
import type { ProviderType } from '@/entities/provider/provider.types.ts'

export function useWorkflowSchema() {
    const logger = useLogger('useWorkflowSchema')
    const nodes = ref<Node[]>([])
    const edges = ref<Edge[]>([])

    function resolveSchemaBuilder(providerType: ProviderType): Maybe<WorkflowSchemaBuilder> {
        return WorkflowSchemaBuilderRegister[providerType]
    }

    function render(providerType: ProviderType, workflow: IWorkflowEntity) {
        const schemaBuilder = resolveSchemaBuilder(providerType)
        if (!schemaBuilder || typeof schemaBuilder !== 'function') {
            logger.warn(`No workflow schema builder found for provider type: ${providerType}`)
            return
        }

        const result = schemaBuilder(workflow)
        if (!result.ok) {
            clear()
            logger.warn(`Failed to build workflow schema for provider type: ${providerType}`, result.error)
            return
        }

        nodes.value = result.value.nodes
        edges.value = result.value.edges
    }

    function clear() {
        nodes.value = []
        edges.value = []
    }

    return {
        render,
        nodes,
        edges,
    }
}
