<script setup lang="ts">
import { useCapabilityRecordsList } from '@/core/capability'
import { FunctionIcon } from '@/modules/capabilities/functions'
import { useRouteParams } from '@vueuse/router'
import { type IFunctionRecordEntity, ProviderCapabilityType } from '@zoho-ide/shared'
import { useRouter } from 'vue-router'
import { ListBox, ListItem } from '@zoho-ide/ui-kit'
import { AppRouteName } from '@/app/router/app-routes.ts'

const providerId = useRouteParams<string>('providerId')
const activeFunctionId = useRouteParams<string>('functionId')
const { data: functions } = useCapabilityRecordsList<IFunctionRecordEntity>(
    ProviderCapabilityType.FUNCTIONS,
    providerId
)
const router = useRouter()

function handleSelectFunction(value?: IFunctionRecordEntity) {
    if (providerId.value && value?.id) {
        router.push({
            name: AppRouteName.workspaceFunctions,
            params: { providerId: providerId.value, functionId: value.id },
        })
    }
}
</script>

<template>
    <ListBox
        :items="functions"
        search-strategy="internal"
        :search-fields="['display_name']"
        @select-item="handleSelectFunction"
        :is-active-item="(item) => item.id === activeFunctionId"
    >
        <template #item="{ item }">
            <ListItem
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.workspaceFunctions, params: { providerId, functionId: item.id } }"
                :tooltip="`${item.type}: ${item.display_name}`"
            >
                <template #icon>
                    <FunctionIcon :type="item.type" class="shrink-0" />
                </template>
                <div class="truncate">{{ item.display_name }}</div>
            </ListItem>
        </template>
    </ListBox>
</template>

<style scoped></style>
