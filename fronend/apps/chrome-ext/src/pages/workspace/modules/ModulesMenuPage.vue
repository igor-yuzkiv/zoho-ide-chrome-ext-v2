<script setup lang="ts">
import { CapabilityType } from '@zoho-ide/shared'
import { useRouteParams } from '@vueuse/router'
import type { IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import { ListBox, ListItem } from '@zoho-ide/shared'
import { useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsList } from '@/entities/capability/composables/useCapabilityRecordsList.ts'

const providerId = useRouteParams<string>('providerId')
const activeModuleId = useRouteParams<string>('moduleId')
const { data: modules } = useCapabilityRecordsList<IModuleMetadataRecordEntity>(CapabilityType.MODULES, providerId)
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
        :search-fields="['displayName']"
        @select-item="handleSelectModule"
        :is-active-item="(item) => item.id === activeModuleId"
    >
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
