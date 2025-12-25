<script setup lang="ts">
import { PROVIDER_CACHE_TTL_MS } from '@/config/providers.config.ts'
import { format } from 'date-fns'
import { startCase } from 'lodash'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { PageHeader } from '@zoho-ide/ui-kit'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'
import { ProviderSettingsDialog, useProviderSettingsForm } from '@/features/provider/settings'

const providersStore = useProvidersStore()
const { providersList } = storeToRefs(providersStore)

const { visible, formData, formErrors, openForm, submitForm } = useProviderSettingsForm()

function formatMetadata(metadata: Record<string, unknown>): { label: string; value: string }[] {
    return Object.entries(metadata).map(([key, value]) => ({
        label: startCase(key),
        value: String(value),
    }))
}
const itemsForDisplay = computed(() => {
    if (!providersList.value) {
        return []
    }

    return providersList.value.map((provider) => ({
        ...provider,
        type: startCase(provider.type),
        lastSyncedAt: provider.lastSyncedAt ? format(new Date(provider.lastSyncedAt), 'yyyy-MM-dd HH:mm') : 'Never',
        serviceIcon: provider.serviceIcon || 'mdi:cloud-question',
        cacheTtlMs: provider?.cacheTtlMs || PROVIDER_CACHE_TTL_MS,
        online: provider.tabId ? 'online' : 'offline',
        metadataFormatted: formatMetadata(provider.metadata || {}),
    }))
})
</script>

<template>
    <div class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader title="Settings" />

        <div class="flex h-full w-full flex-col overflow-hidden app-card">
            <DataTable :value="itemsForDisplay" striped-rows row-hover size="small" scrollable scroll-height="flex">
                <template #empty> No providers available </template>

                <Column field="id" header="ID" />
                <Column field="title" header="Title"></Column>
                <Column field="metadataFormatted" header="Metadata">
                    <template #body="{ data }">
                        <div class="flex flex-col">
                            <div v-for="item in data.metadataFormatted" :key="item.label" class="flex gap-x-2">
                                <span class="font-semibold">{{ item.label }}:</span>
                                <span>{{ item.value }}</span>
                            </div>
                        </div>
                    </template>
                </Column>
                <Column field="online" header="Online Status"></Column>
                <Column field="lastSyncedAt" header="Last Synced At"></Column>
                <Column field="cacheTtlMs" header="Cache TTL (ms)"></Column>
                <Column header="Actions">
                    <template #body="{ data }">
                        <Button
                            text
                            label="View"
                            severity="info"
                            size="small"
                            as="router-link"
                            :to="{ name: AppRouteName.workspaceIndex, params: { providerId: data.id } }"
                        />
                        <Button text label="Edit" size="small" @click="openForm(data.id)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <ProviderSettingsDialog
        v-model:visible="visible"
        v-model:form-data="formData"
        @submit="submitForm"
        :form-errors="formErrors"
    />
</template>

<style scoped></style>
