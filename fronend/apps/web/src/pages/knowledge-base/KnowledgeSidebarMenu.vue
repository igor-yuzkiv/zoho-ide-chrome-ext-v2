<script setup lang="ts">
import {
    type IKnowledgeBaseItem,
    NewKnowledgeBaseItemPopup,
    useDeleteKbItem,
    useKbItemsListQuery,
} from '@zoho-ide/knowledge-base'
import { IconButton, ListBox, ListItem } from '@zoho-ide/shared'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

const { data: items } = useKbItemsListQuery()
const newItemDialogVisible = ref(false)
const router = useRouter()
const route = useRoute()

const { removeWithConfirmation } = useDeleteKbItem()

function handleItemCreated(item: IKnowledgeBaseItem) {
    if (item && item.id) {
        router.push({ name: AppRouteName.kbItemEdit, params: { itemId: item.id } })
    }
}

const isActiveListItem = (item: IKnowledgeBaseItem) => {
    return (
        [AppRouteName.kbItemDetails, AppRouteName.kbItemEdit].includes(route.name as string) &&
        route.params.itemId === item.id
    )
}

async function handleRemoveItem(itemId: string, itemTitle: string) {
    const isRemoved = await removeWithConfirmation(itemId, itemTitle)
    if (isRemoved && route.params.itemId === itemId) {
        router.push({ name: AppRouteName.kbIndex }).catch(console.error)
    }
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
                :to="{ name: AppRouteName.kbItemDetails, params: { itemId: item.id } }"
                icon="carbon:ibm-watson-knowledge-catalog"
                :title="item.title"
            >
                <template #actions>
                    <IconButton
                        class="p-0"
                        text
                        icon="material-symbols:delete"
                        @click.prevent="handleRemoveItem(item.id, item.title)"
                    />
                </template>
            </ListItem>
        </template>
    </ListBox>

    <NewKnowledgeBaseItemPopup v-model:visible="newItemDialogVisible" @created="handleItemCreated" />
</template>

<style scoped></style>
