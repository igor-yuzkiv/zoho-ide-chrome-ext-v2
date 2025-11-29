<script setup lang="ts">
import { FunctionIcon, useFunctionsList } from '@/capabilities/function'
import { useRouteParams } from '@vueuse/router'
import { ListBox, ListItem } from '@zoho-ide/shared'
import { AppRouteName } from '@/app/router/app-routes.ts'

const providerId = useRouteParams<string>('providerId')
const functions = useFunctionsList(providerId)
</script>

<template>
    <ListBox :items="functions.data.value" searchable :searchFields="['displayName']">
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
