<script setup lang="ts">
import { useCapabilityRecordsQuery } from '@/core/cache'
import { useRouteParams } from '@vueuse/router'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import { useRouter } from 'vue-router'
import { ListBox, ListItem } from '@zoho-ide/ui-kit'
import { AppRouteName } from '@/app/router/app-routes.ts'

const providerId = useRouteParams<string>('providerId')
const activeModuleId = useRouteParams<string>('moduleId')
const { data: modules } = useCapabilityRecordsQuery<IModuleMetadataRecordEntity>(
    ProviderCapabilityType.MODULES,
    providerId
)
const router = useRouter()

function handleSelectModule(value?: IModuleMetadataRecordEntity) {
    if (providerId.value && value?.id) {
        router.push({
            name: AppRouteName.workspaceModules,
            params: { providerId: providerId.value, moduleId: value.id },
        })
    }
}
</script>

<template>
    <ListBox
        :items="modules"
        search-strategy="internal"
        :search-fields="['display_name']"
        @select-item="handleSelectModule"
        :is-active-item="(item) => item.id === activeModuleId"
    >
        <template #item="{ item }">
            <ListItem
                icon="streamline-sharp:module"
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.workspaceModules, params: { providerId, moduleId: item.id } }"
                :title="item.display_name"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
