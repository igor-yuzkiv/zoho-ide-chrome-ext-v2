<script setup lang="ts">
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import type { IModuleMetadataEntity } from '@zoho-ide/shared'
import { ListBox, ListItem } from '@zoho-ide/shared'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsList } from '@/features/provider/capability-records-list'

const providerId = useRouteParams<string>('providerId')
const { data: modules } = useCapabilityRecordsList<IModuleMetadataEntity>(CapabilityType.MODULES, providerId)
</script>

<template>
    <ListBox :items="modules" search-strategy="internal" :search-fields="['displayName']">
        <template #item="{ item }">
            <ListItem
                icon="streamline-sharp:module"
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.workspaceModules, params: { providerId, moduleId: item.id } }"
                :title="item.displayName"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
