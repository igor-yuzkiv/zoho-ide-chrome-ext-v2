<script setup lang="ts">
import { useWorkflowSchema } from '@/capabilities/workflow/composables/useWorkflowSchema.ts'
import WfActionNode from '@/capabilities/workflow/components/schema-nodes/WfActionNode.vue'
import WfConditionNode from '@/capabilities/workflow/components/schema-nodes/WfConditionNode.vue'
import WfWhenNode from '@/capabilities/workflow/components/schema-nodes/WfWhenNode.vue'
import type { IWorkflowEntity } from '@/capabilities/workflow/workflow.types.ts'
import type { ProviderType } from '@/entities/provider/provider.types.ts'
import { VueFlow } from '@vue-flow/core'
import { watchEffect } from 'vue'

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
    <VueFlow :nodes="workflowSchema.nodes.value" :edges="workflowSchema.edges.value" fit-view-on-init>
        <template #node-WfWhenNode="props">
            <WfWhenNode :id="props.id" :data="props.data" />
        </template>

        <template #node-WfConditionNode="props">
            <WfConditionNode :id="props.id" :data="props.data" />
        </template>

        <template #node-WfActionNode="props">
            <WfActionNode :id="props.id" :data="props.data" />
        </template>
    </VueFlow>
</template>

<style scoped></style>
