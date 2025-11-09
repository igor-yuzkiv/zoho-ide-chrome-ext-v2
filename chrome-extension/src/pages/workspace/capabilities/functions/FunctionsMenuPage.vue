<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { FunctionsListItem, useFunctionsList } from '@/capabilities/function'
import { CapabilityEntitiesMenu } from '@/widgets/capability/capability-entities-list'

const providerId = useRouteParams<string>('providerId')
const functions = useFunctionsList(providerId)
</script>

<template>
    <CapabilityEntitiesMenu :records="functions.data.value || []">
        <template #item="{ item }">
            <FunctionsListItem
                :fx="item"
                as="router-link"
                :to="{ name: AppRouteName.workspaceFunctions, params: { providerId, functionId: item.id } }"
                active-class="app-list-item-active"
            />
        </template>
    </CapabilityEntitiesMenu>
</template>

<style scoped></style>
