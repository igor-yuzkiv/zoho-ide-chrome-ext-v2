<script setup lang="ts" generic="T extends ICapabilityEntity = ICapabilityEntity">
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import type { ICapabilityEntity } from '@/core/types/capability.types.ts'
import { CapabilityEntitiesList, CapabilityEntityListItem } from '@/widgets/capability/capability-entities-list'

const props = withDefaults(
    defineProps<{
        records: T[]
        searchBy?: string
    }>(),
    {
        searchBy: 'displayName',
    }
)

const searchTerm = ref('')
const itemsForDisplay = computed(() => {
    if (!searchTerm.value || !props.records) {
        return props.records || []
    }

    return props.records.filter((item) =>
        (item[props.searchBy as keyof T] as unknown as string).toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})
</script>

<template>
    <div class="flex h-full w-[20rem] flex-col overflow-x-hidden overflow-y-auto">
        <div class="flex border-b">
            <InputText
                v-model.lazy="searchTerm"
                size="small"
                class="w-full bg-primary rounded-none border-none"
                placeholder="Start typing to search workflows..."
            />
        </div>

        <div class="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
            <slot name="list" v-bind="{ items: itemsForDisplay }">
                <CapabilityEntitiesList :items="itemsForDisplay">
                    <template #item="{ item }">
                        <slot name="item" :item="item">
                            <CapabilityEntityListItem :item="item" />
                        </slot>
                    </template>
                </CapabilityEntitiesList>
            </slot>
        </div>
    </div>
</template>

<style scoped></style>
