<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { defineAsyncComponent } from 'vue'
import { NoDataMessage, PageHeader, useViewModeSelect, ViewModeSelect } from '@zoho-ide/ui-kit'
import { useCurrentProvider } from '@/core/provider'
import { useWorkflowDetails } from '@/modules/capabilities/workflows/composables/useWorkflowDetails.ts'

const providerId = useRouteParams<string>('providerId')
const workflowId = useRouteParams<string>('workflowId')
const { data: currentProvider } = useCurrentProvider()
const workflow = useWorkflowDetails(providerId, workflowId)

const viewMode = useViewModeSelect(
    [
        {
            value: 'json',
            icon: 'si:json-duotone',
            component: defineAsyncComponent(
                () => import('@/modules/capabilities/workflows/components/detail-view/WorkflowJsonView.vue')
            ),
        },
        {
            value: 'schema',
            icon: 'material-symbols:schema',
            component: defineAsyncComponent(
                () => import('@/modules/capabilities/workflows/components/detail-view/WorkflowSchemaView.vue')
            ),
        },
    ],
    'schema'
)
</script>

<template>
    <div v-if="currentProvider && workflow.data.value" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="workflow.data.value.display_name" :description="workflow.data.value.description">
            <template #actions>
                <ViewModeSelect :options="viewMode.options" v-model="viewMode.current.value" />
            </template>
        </PageHeader>

        <div v-if="viewMode.currentComponent.value" class="flex h-full w-full flex-col overflow-auto app-card">
            <component
                :is="viewMode.currentComponent.value"
                :workflow="workflow.data.value"
                :providerType="currentProvider.type"
            />
        </div>
    </div>

    <NoDataMessage
        v-else
        class="h-full w-full app-card"
        title="Workflow Not Selected"
        message="Select a workflow to view its details"
    />
</template>

<style scoped></style>
