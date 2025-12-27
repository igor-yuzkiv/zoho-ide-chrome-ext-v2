<script setup lang="ts">
import { useCapabilityRecordByIdQuery } from '@/core/cache'
import { useModuleFields } from '@/modules/capabilities/metadata/composables/useModuleFields.ts'
import { useRouteParams } from '@vueuse/router'
import { IModuleMetadataRecordEntity, ProviderCapabilityType } from '@zoho-ide/shared'
import { defineAsyncComponent } from 'vue'
import { NoDataMessage, PageHeader, useViewModeSelect, ViewModeSelect } from '@zoho-ide/ui-kit'

const providerId = useRouteParams<string>('providerId')
const moduleId = useRouteParams<string>('moduleId')

const { data: module } = useCapabilityRecordByIdQuery<IModuleMetadataRecordEntity>(
    providerId,
    ProviderCapabilityType.MODULES,
    moduleId
)

const fields = useModuleFields(providerId, moduleId)

const viewMode = useViewModeSelect(
    [
        {
            value: 'json',
            icon: 'si:json-duotone',
            component: defineAsyncComponent(
                () => import('@/modules/capabilities/metadata/components/detail-view/ModuleJsonView.vue')
            ),
        },
        {
            value: 'table',
            icon: 'material-symbols:table-sharp',
            component: defineAsyncComponent(
                () => import('@/modules/capabilities/metadata/components/detail-view/ModuleTableView.vue')
            ),
        },
    ],
    'table'
)
</script>

<template>
    <div v-if="module" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="module.api_name">
            <template #actions>
                <ViewModeSelect :options="viewMode.options" v-model="viewMode.current.value" />
            </template>
        </PageHeader>

        <div v-if="viewMode.currentComponent.value" class="flex h-full w-full flex-col overflow-auto app-card">
            <component :is="viewMode.currentComponent.value" :module="module" :fields="fields.data.value" />
        </div>
    </div>
    <NoDataMessage
        v-else
        class="w-full h-full app-card"
        title="Module Not Selected"
        message="Please select a module to view its details."
    />
</template>

<style scoped></style>
