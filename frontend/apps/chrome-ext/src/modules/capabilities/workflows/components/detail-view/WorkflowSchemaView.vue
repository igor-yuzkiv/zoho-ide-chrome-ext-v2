<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import type { ZohoServiceProviderType } from '@zoho-ide/shared'
import { watchEffect } from 'vue'
import WfActionNode from '@/modules/capabilities/workflows/components/schema-nodes/WfActionNode.vue'
import WfConditionNode from '@/modules/capabilities/workflows/components/schema-nodes/WfConditionNode.vue'
import WfWhenNode from '@/modules/capabilities/workflows/components/schema-nodes/WfWhenNode.vue'
import { useWorkflowSchema } from '@/modules/capabilities/workflows/composables/useWorkflowSchema.ts'

const props = defineProps<{
    providerType: ZohoServiceProviderType
    workflow: IWorkflowRecordEntity
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
