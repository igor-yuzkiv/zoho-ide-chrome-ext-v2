<script setup lang="ts">
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsQuery } from '@/entities/capability/composables/useCapabilityRecordsQuery.ts'
import type { IModuleMetadataEntity } from '@/capabilities/metadata/metadata.types.ts'
import { CapabilityEntitiesMenu, CapabilityEntityListItem } from '@/features/capability/capability-entities-list'

const providerId = useRouteParams<string>('providerId')
const modules = useCapabilityRecordsQuery<IModuleMetadataEntity>(CapabilityType.MODULES, providerId)
</script>

<template>
    <CapabilityEntitiesMenu :records="modules.data.value || []">
        <template #item="{ item }">
            <CapabilityEntityListItem
                :item="item"
                as="router-link"
                :to="{ name: AppRouteName.workspaceModules, params: { providerId, moduleId: item.id } }"
                active-class="app-list-item-active"
            />
        </template>
    </CapabilityEntitiesMenu>
</template>

<style scoped></style>
