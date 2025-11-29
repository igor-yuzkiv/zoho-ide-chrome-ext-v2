<script setup lang="ts">
import type { IWorkflowEntity } from '@/capabilities/workflow/workflow.types.ts'
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import { ListBox, ListItem } from '@zoho-ide/shared'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsList } from '@/features/capability/capability-records-list'

const providerId = useRouteParams<string>('providerId')
const { data: workflows } = useCapabilityRecordsList<IWorkflowEntity>(CapabilityType.WORKFLOWS, providerId)
</script>

<template>
    <ListBox :items="workflows" searchable :searchFields="['displayName']">
        <template #item="{ item }">
            <ListItem
                icon="mdi:workflow"
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.workspaceWorkflows, params: { providerId, workflowId: item.id } }"
                :title="item.displayName"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
