<script setup lang="ts">
import { PageHeader } from '@zoho-ide/shared'
import { useToast } from '@zoho-ide/shared'
import { ref, watch } from 'vue'
import { InputText } from 'primevue'
import { Button } from 'primevue'
import { useConfirm } from 'primevue'
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'

const toast = useToast()
const confirm = useConfirm()
const { data: currentProvider, update: updateCurrentProvider, isOnline } = useCurrentProvider()
const providerTitle = ref('')

function handleSave() {
    if (!providerTitle.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Provider name cannot be empty', life: 3000 })
        return
    }

    updateCurrentProvider({ title: providerTitle.value })
}

function handleClearCache() {
    if (!isOnline.value) {
        toast.warn({ detail: 'Cannot clear cache while provider offline' })
        return
    }

    confirm.require({
        message: `Are you sure you want to clear the cache for this provider?`,
        header: 'Confirmation',
        accept: () => {
            //TODO: remove capability records and local storage data
        },
    })
}

watch(currentProvider, (newProvider) => (providerTitle.value = newProvider?.title || ''), { immediate: true })
</script>

<template>
    <div v-if="currentProvider" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="currentProvider.title" description="Settings">
            <template #actions>
                <Button severity="secondary" label="Clear Cache" @click="handleClearCache" />
                <Button label="Save" @click="handleSave" />
            </template>
        </PageHeader>

        <div class="flex h-full w-full flex-col overflow-hidden p-2 app-card">
            <div class="flex flex-col">
                <label for="provider_title" class="font-bold block mb-2">Provider Name</label>
                <InputText fluid id="provider_title" placeholder="Provider Name" v-model="providerTitle" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
