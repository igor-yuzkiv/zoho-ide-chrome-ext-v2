<script setup lang="ts">
import { type IKnowledgeBaseItem, NewKnowledgeBaseItemPopup, useKbItemsListQuery } from '@zoho-ide/knowledge-base'
import { IconButton, ListBox, ListItem } from '@zoho-ide/shared'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

const { data: items } = useKbItemsListQuery()
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
        [AppRouteName.knowledgeBaseArticleDetails, AppRouteName.knowledgeBaseArticleEdit].includes(
            route.name as string
        ) && route.params.itemId === item.id
    )
}
</script>

<template>
    <ListBox class="px-2" :items="items" searchable :search-fields="['title']" :is-active-item="isActiveListItem">
        <template #search-extra>
            <IconButton icon="ic:baseline-plus" text @click="newItemDialogVisible = true" />
        </template>

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

    <NewKnowledgeBaseItemPopup v-model:visible="newItemDialogVisible" @created="handleItemCreated" />
</template>

<style scoped></style>
