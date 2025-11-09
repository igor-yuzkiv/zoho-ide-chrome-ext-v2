<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import { watchEffect } from 'vue'
import type { IWorkflowEntity } from '@/capabilities/workflow/model/workflow.types.ts'
import type { ProviderType } from '@/core/types/provider.types.ts'
import { WfConditionStatementNode, WfWhenStatementNode } from '@/features/workflows/schema'
import { useWorkflowSchema } from '@/features/workflows/schema/lib/useWorkflowSchema.ts'
import WfActionNode from '@/features/workflows/schema/ui/nodes/WfActionNode.vue'

const props = defineProps<{
    providerType: ProviderType
    workflow: IWorkflowEntity
}>()

const workflowSchema = useWorkflowSchema()

watchEffect(() => {
    try {
        if (props.providerType && props.workflow) {
            workflowSchema.render(props.providerType, props.workflow)
        }
    } catch (e) {
        console.error(e)
    }
})
</script>

<template>
    <VueFlow :nodes="workflowSchema.nodes.value" :edges="workflowSchema.edges.value">
        <template #node-WfWhenNode="props">
            <WfWhenStatementNode :id="props.id" :data="props.data" />
        </template>

        <template #node-WfConditionNode="props">
            <WfConditionStatementNode :id="props.id" :data="props.data" />
        </template>

        <template #node-WfActionNode="props">
            <WfActionNode :id="props.id" :data="props.data" />
        </template>
    </VueFlow>
</template>

<style scoped></style>
