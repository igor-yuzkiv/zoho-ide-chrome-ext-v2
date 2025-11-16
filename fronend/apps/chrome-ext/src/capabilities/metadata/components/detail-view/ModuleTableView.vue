<script setup lang="ts">
import { computed, ref } from 'vue'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { CopyText } from '@zoho-ide/ui-kit/components'
import type {
    IModuleFieldMetadataEntity,
    IModuleMetadataEntity,
} from '@/capabilities/metadata/metadata.types.ts'

const props = defineProps<{
    module?: IModuleMetadataEntity
    fields?: IModuleFieldMetadataEntity[]
}>()

const searchTerm = ref('')

const itemsForDisplay = computed(() => {
    if (!props.fields || !searchTerm.value) {
        return props.fields || []
    }

    return props.fields.filter(
        (field) =>
            field.displayName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            field.apiName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            field.displayDataType.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})
</script>

<template>
    <DataTable :value="itemsForDisplay" striped-rows row-hover size="small" scrollable scroll-height="flex">
        <template #empty> No fields available for module {{ module?.displayName || '' }} </template>
        <template #header>
            <div class="flex items-center justify-end">
                <InputText v-model.lazy="searchTerm" placeholder="Search" size="small" />
            </div>
        </template>

        <Column field="displayName" header="Display Name"></Column>
        <Column field="displayDataType" header="Type"></Column>
        <Column field="apiName" header="Api Name">
            <template #body="slotProps">
                <CopyText :value="slotProps.data.apiName" tag="span" />
            </template>
        </Column>
    </DataTable>
</template>

<style scoped></style>
