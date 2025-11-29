<script setup lang="ts">
import { IconButton, ListBox, ListItem } from '@zoho-ide/ui-kit/components'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useKbItemsList } from '@/features/knowledge-base'

const { data: items } = useKbItemsList()
</script>

<template>
    <ListBox class="px-2" :items="items" searchable :search-fields="['title']">
        <template #search-extra>
            <IconButton icon="ic:baseline-plus" text as="router-link" :to="{ name: AppRouteName.kbNewItem }" />
        </template>

        <template #item="{ item }">
            <ListItem
                as="router-link"
                :to="{ name: AppRouteName.kbItemDetails, params: { itemId: item.id } }"
                icon="carbon:ibm-watson-knowledge-catalog"
                :title="item.title"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
