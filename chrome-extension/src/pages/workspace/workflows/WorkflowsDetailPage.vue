<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { computed, defineAsyncComponent } from 'vue'
import { NoDataMessage } from '@/shared/components/messages'
import { PageHeader } from '@/shared/components/page-header'
import { useProvidersStore } from '@/core/store/useProvidersStore.ts'
import { useWorkflowDetails } from '@/features/workflows/details/lib/useWorkflowDetails.ts'
import { useViewMode, ViewModeSelect } from '@/widgets/view-mode'

const providerId = useRouteParams<string>('providerId')
const workflowId = useRouteParams<string>('workflowId')
const workflow = useWorkflowDetails(providerId, workflowId)

const viewMode = useViewMode(
    [
        {
            value: 'json',
            icon: 'si:json-duotone',
            component: defineAsyncComponent(() => import('@/features/workflows/details/ui/WorkflowJsonView.vue')),
        },
        {
            value: 'schema',
            icon: 'material-symbols:schema',
            component: defineAsyncComponent(() => import('@/features/workflows/details/ui/WorkflowSchemaView.vue')),
        },
    ],
    'schema'
)

const providers = useProvidersStore()
const providerType = computed(() => providers.findById(providerId.value)?.type)
</script>

<template>
    <div v-if="workflow.data.value" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="workflow.data.value.displayName" :description="workflow.data.value.description">
            <template #actions>
                <ViewModeSelect :options="viewMode.options" v-model="viewMode.current.value" />
            </template>
        </PageHeader>

        <div
            v-if="viewMode.currentComponent.value"
            class="flex h-full w-full flex-col overflow-auto bg-primary rounded-lg"
        >
            <component
                :is="viewMode.currentComponent.value"
                :workflow="workflow.data.value"
                :providerType="providerType"
            />
        </div>
    </div>

    <NoDataMessage
        v-else
        class="h-full w-full bg-primary rounded-lg"
        title="Workflow Not Selected"
        message="Select a workflow to view its details"
    />
</template>

<style scoped></style>
