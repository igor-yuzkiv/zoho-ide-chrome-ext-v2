<script setup lang="ts">
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import type { IWorkflowEntity } from '@/capabilities/workflow/workflow.types.ts'
import { useCapabilityRecordsList, CapabilityEntitiesMenu, CapabilityEntityListItem } from '@/features/capability/capability-records-list'

const providerId = useRouteParams<string>('providerId')
const workflows = useCapabilityRecordsList<IWorkflowEntity>(CapabilityType.WORKFLOWS, providerId)
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
