<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { IFunctionRecordEntity, ListBox, ListItem, ProviderCapabilityType } from '@zoho-ide/shared'
import { useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilityRecordsList } from '@/entities/capability/composables/useCapabilityRecordsList.ts'
import { FunctionIcon } from '@/features/function-capability'

const providerId = useRouteParams<string>('providerId')
const activeFunctionId = useRouteParams<string>('functionId')
const { data: functions } = useCapabilityRecordsList<IFunctionRecordEntity>(providerId, ProviderCapabilityType.FUNCTIONS)
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
        :search-fields="['displayName']"
        @select-item="handleSelectFunction"
        :is-active-item="(item) => item.id === activeFunctionId"
    >
        <template #item="{ item }">
            <ListItem
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.workspaceFunctions, params: { providerId, functionId: item.id } }"
                :tooltip="`${item.type}: ${item.displayName}`"
            >
                <template #icon>
                    <FunctionIcon :type="item.type" class="shrink-0" />
                </template>
                <div class="truncate">{{ item.displayName }}</div>
            </ListItem>
        </template>
    </ListBox>
</template>

<style scoped></style>
