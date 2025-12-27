<script setup lang="ts">
import { useCapabilityRecordByIdQuery } from '@/core/cache'
import { useCurrentProvider } from '@/core/provider'
import { useRouteParams } from '@vueuse/router'
import { IWorkflowRecordEntity, ProviderCapabilityType } from '@zoho-ide/shared'
import { defineAsyncComponent } from 'vue'
import { NoDataMessage, PageHeader, useViewModeSelect, ViewModeSelect } from '@zoho-ide/ui-kit'

const providerId = useRouteParams<string>('providerId')
const workflowId = useRouteParams<string>('workflowId')
const { data: currentProvider } = useCurrentProvider()

const { data: workflow } = useCapabilityRecordByIdQuery<IWorkflowRecordEntity>(
    providerId,
    ProviderCapabilityType.WORKFLOWS,
    workflowId
)

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
    <div v-if="currentProvider && workflow" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="workflow.display_name" :description="workflow.description">
            <template #actions>
                <ViewModeSelect :options="viewMode.options" v-model="viewMode.current.value" />
            </template>
        </PageHeader>

        <div v-if="viewMode.currentComponent.value" class="flex h-full w-full flex-col overflow-auto app-card">
            <component
                :is="viewMode.currentComponent.value"
                :workflow="workflow"
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
