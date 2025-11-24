<script setup lang="ts">
import type { IModuleMetadataEntity } from '@/capabilities/metadata/metadata.types.ts'
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import { ListBox, ListItem } from '@zoho-ide/ui-kit/components'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsList } from '@/features/capability/capability-records-list'

const providerId = useRouteParams<string>('providerId')
const { data: modules } = useCapabilityRecordsList<IModuleMetadataEntity>(CapabilityType.MODULES, providerId)
</script>

<template>
    <ListBox :items="modules" searchable :searchFields="['displayName']">
        <template #item="{ item }">
            <ListItem
                icon="streamline-sharp:module"
                as="router-link"
                :to="{ name: AppRouteName.workspaceModules, params: { providerId, moduleId: item.id } }"
                :title="item.displayName"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
