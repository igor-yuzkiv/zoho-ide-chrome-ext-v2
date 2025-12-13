<script setup lang="ts">
import {
    type IKnowledgeBaseItem,
    KnowledgeBaseCategoryMetadata,
    NewKnowledgeBaseItemPopup,
    useKbItemsListQuery,
} from '@zoho-ide/knowledge-base'
import { IconButton, isRouteName, ListBox, ListItem } from '@zoho-ide/shared'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

const { items, hasNextPage, loadMoreRecords, searchTerm } = useKbItemsListQuery()
const newItemDialogVisible = ref(false)
const router = useRouter()
const route = useRoute()

function handleItemCreated(item: IKnowledgeBaseItem) {
    if (item && item.id) {
        router.push({ name: AppRouteName.knowledgeBaseArticleEdit, params: { itemId: item.id } })
    }
}

const isActiveListItem = (item: IKnowledgeBaseItem) => {
    return (
        isRouteName(route.name, [AppRouteName.knowledgeBaseArticleDetails, AppRouteName.knowledgeBaseArticleEdit]) &&
        route.params.itemId === item.id
    )
}

const getItemIcon = (item: IKnowledgeBaseItem) => {
    return item.category
        ? KnowledgeBaseCategoryMetadata[item.category].icon
        : KnowledgeBaseCategoryMetadata.general.icon
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
        <template #search-extra>
            <IconButton icon="ic:baseline-plus" text @click="newItemDialogVisible = true" />
        </template>

        <template #item="{ item, active }">
            <ListItem
                as="router-link"
                :class="{ 'app-list-item-active': active }"
                :to="{ name: AppRouteName.knowledgeBaseArticleDetails, params: { itemId: item.id } }"
                :icon="getItemIcon(item)"
                :title="item.title"
            />
        </template>
    </ListBox>

    <NewKnowledgeBaseItemPopup v-model:visible="newItemDialogVisible" @created="handleItemCreated" />
</template>

<style scoped></style>
