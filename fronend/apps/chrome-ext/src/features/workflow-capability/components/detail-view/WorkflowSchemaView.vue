<script setup lang="ts">
import WfActionNode from '@/features/workflow-capability/components/schema-nodes/WfActionNode.vue'
import WfConditionNode from '@/features/workflow-capability/components/schema-nodes/WfConditionNode.vue'
import WfWhenNode from '@/features/workflow-capability/components/schema-nodes/WfWhenNode.vue'
import { useWorkflowSchema } from '@/features/workflow-capability/composables/useWorkflowSchema.ts'
import { VueFlow } from '@vue-flow/core'
import type { IWorkflowEntity } from '@zoho-ide/shared'
import type { ProviderType } from '@zoho-ide/shared'
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
