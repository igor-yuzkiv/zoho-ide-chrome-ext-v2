<script setup lang="ts">
import { type IKnowledgeBaseItem, useKbItemsListQuery } from '@zoho-ide/knowledge-base'
import { isRouteName, ListBox, ListItem } from '@zoho-ide/shared'
import { useRoute } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

const { items, hasNextPage, loadMoreRecords, searchTerm } = useKbItemsListQuery()
const route = useRoute()

const isActiveListItem = (item: IKnowledgeBaseItem) => {
    return (
        isRouteName(route.name, [AppRouteName.knowledgeBaseArticleDetails, AppRouteName.knowledgeBaseArticleEdit]) &&
        route.params.itemId === item.id
    )
}
</script>

<template>
    <ListBox
        :items="items"
        search-strategy="external"
        :is-active-item="isActiveListItem"
        :has-more-items="hasNextPage"
        @load-more="loadMoreRecords"
        v-model:search-term="searchTerm"
    >
        <template #item="{ item, active }">
            <ListItem
                as="router-link"
                :class="{ 'app-list-item-active': active }"
                :to="{ name: AppRouteName.knowledgeBaseArticleDetails, params: { itemId: item.id } }"
                icon="carbon:ibm-watson-knowledge-catalog"
                :title="item.title"
            />
        </template>
    </ListBox>
</template>

<style scoped></style>
