<script setup lang="ts">
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import type { IWorkflowEntity } from '@zoho-ide/shared'
import { ListBox, ListItem } from '@zoho-ide/shared'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsList } from '@/entities/capability/composables/useCapabilityRecordsList.ts'

const providerId = useRouteParams<string>('providerId')
const { data: workflows } = useCapabilityRecordsList<IWorkflowEntity>(CapabilityType.WORKFLOWS, providerId)
</script>

<template>
    <ListBox :items="workflows" search-strategy="internal" :search-fields="['displayName']">
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
