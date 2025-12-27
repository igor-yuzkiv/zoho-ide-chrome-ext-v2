<script setup lang="ts">
import { useCapabilityRecordsQuery } from '@/core/capability'
import { useRouteParams } from '@vueuse/router'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { IWorkflowRecordEntity } from '@zoho-ide/shared'
import { useRouter } from 'vue-router'
import { ListBox, ListItem } from '@zoho-ide/ui-kit'
import { AppRouteName } from '@/app/router/app-routes.ts'

const providerId = useRouteParams<string>('providerId')
const activeWorkflowId = useRouteParams<string>('workflowId')
const { data: workflows } = useCapabilityRecordsQuery<IWorkflowRecordEntity>(
    ProviderCapabilityType.WORKFLOWS,
    providerId
)
const router = useRouter()

function handleSelectWorkflow(value?: IWorkflowRecordEntity) {
    if (providerId.value && value?.id) {
        router.push({
            name: AppRouteName.workspaceWorkflows,
            params: { providerId: providerId.value, workflowId: value.id },
        })
    }
}
</script>

<template>
    <ListBox
        :items="workflows"
        search-strategy="internal"
        :search-fields="['display_name']"
        @select-item="handleSelectWorkflow"
        :is-active-item="(item) => item.id === activeWorkflowId"
    >
        <template #item="{ item }">
            <ListItem
                icon="mdi:workflow"
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.workspaceWorkflows, params: { providerId, workflowId: item.id } }"
                :title="item.display_name"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
