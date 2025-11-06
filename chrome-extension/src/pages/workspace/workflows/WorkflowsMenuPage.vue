<script setup lang="ts">
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsQuery } from '@/core/composables/useCapabilityRecordsQuery.ts'
import type { IWorkflowEntity } from '@/entities/workflow/model/workflow.types.ts'
import { CapabilityEntitiesMenu, CapabilityEntityListItem } from '@/widgets/capability/capability-entities-list'

const providerId = useRouteParams<string>('providerId')
const workflows = useCapabilityRecordsQuery<IWorkflowEntity>(CapabilityType.WORKFLOWS, providerId)
</script>

<template>
    <CapabilityEntitiesMenu :records="workflows.data.value || []">
        <template #item="{ item }">
            <CapabilityEntityListItem
                :item="item"
                as="router-link"
                :to="{ name: AppRouteName.workspaceWorkflows, params: { providerId, workflowId: item.id } }"
                active-class="app-list-item-active"
            />
        </template>
    </CapabilityEntitiesMenu>
</template>

<style scoped></style>
