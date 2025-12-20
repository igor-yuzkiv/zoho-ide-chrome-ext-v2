<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { NoDataMessage, PageHeader } from '@zoho-ide/shared'
import { defineAsyncComponent } from 'vue'
import { useModuleDetails } from '@/features/metadata-capability'
import { useModuleFields } from '@/features/metadata-capability/composables/useModuleFields.ts'
import { useViewMode, ViewModeSelect } from '@/widgets/view-mode'

const providerId = useRouteParams<string>('providerId')
const moduleId = useRouteParams<string>('moduleId')

const module = useModuleDetails(providerId, moduleId)
const fields = useModuleFields(providerId, moduleId)

const viewMode = useViewMode(
    [
        {
            value: 'json',
            icon: 'si:json-duotone',
            component: defineAsyncComponent(
                () => import('@/features/metadata-capability/components/detail-view/ModuleJsonView.vue')
            ),
        },
        {
            value: 'table',
            icon: 'material-symbols:table-sharp',
            component: defineAsyncComponent(
                () => import('@/features/metadata-capability/components/detail-view/ModuleTableView.vue')
            ),
        },
    ],
    'table'
)
</script>

<template>
    <div v-if="module.data.value" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="module.data.value.apiName">
            <template #actions>
                <ViewModeSelect :options="viewMode.options" v-model="viewMode.current.value" />
            </template>
        </PageHeader>

        <div v-if="viewMode.currentComponent.value" class="flex h-full w-full flex-col overflow-auto app-card">
            <component :is="viewMode.currentComponent.value" :module="module.data.value" :fields="fields.data.value" />
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
