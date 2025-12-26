<script setup lang="ts">
import type { IModuleFieldMetadataRecordEntity, IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import { computed, ref } from 'vue'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { CopyText } from '@zoho-ide/ui-kit'

const props = defineProps<{
    module?: IModuleMetadataRecordEntity
    fields?: IModuleFieldMetadataRecordEntity[]
}>()

const searchTerm = ref('')

const itemsForDisplay = computed(() => {
    if (!props.fields || !searchTerm.value) {
        return props.fields || []
    }

    return props.fields.filter(
        (field) =>
            field.display_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            field.api_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            field.display_data_type.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})
</script>

<template>
    <DataTable :value="itemsForDisplay" striped-rows row-hover size="small" scrollable scroll-height="flex">
        <template #empty> No fields available for module {{ module?.display_name || '' }}</template>
        <template #header>
            <div class="flex items-center justify-end">
                <InputText v-model.lazy="searchTerm" placeholder="Search" size="small" />
            </div>
        </template>

        <Column field="display_name" header="Display Name"></Column>
        <Column field="display_data_type" header="Type"></Column>
        <Column field="api_name" header="Api Name">
            <template #body="slotProps">
                <CopyText :value="slotProps.data.api_name" tag="span" />
            </template>
        </Column>
    </DataTable>
</template>

<style scoped></style>
