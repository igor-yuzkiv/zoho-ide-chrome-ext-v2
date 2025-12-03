<script setup lang="ts">
import { useKnowledgeBaseItemsListQuery } from '@zoho-ide/knowledge-base'
import { ListBox, ListItem } from '@zoho-ide/shared'
import { AppRouteName } from '@/app/router/app-routes.ts'

const { data: items } = useKnowledgeBaseItemsListQuery()
</script>

<template>
    <ListBox class="px-2" :items="items" searchable :search-fields="['title']">
        <template #item="{ item }">
            <ListItem
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.knowledgeBaseArticle, params: { itemId: item.id } }"
                icon="carbon:ibm-watson-knowledge-catalog"
                :title="item.title"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
