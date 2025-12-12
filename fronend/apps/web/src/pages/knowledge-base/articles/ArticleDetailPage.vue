<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ArticleReadView, useDeleteKbItem, useKbItemDetailsQuery } from '@zoho-ide/knowledge-base'
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useRouter } from 'vue-router'

const router = useRouter();
const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetailsQuery(itemId)
const { removeWithConfirmation, isPending: isRemovePending } = useDeleteKbItem()

function handleDelete() {
    if (!data.value) {
        return
    }

    removeWithConfirmation(data.value.id, data.value.title)
        .then((isRemoved) => {
            if (isRemoved) {
                router.push({ name: AppRouteName.knowledgeBaseIndex }).catch(console.error)
            }
        })
}
</script>

<template>
    <ArticleReadView v-if="data" :article="data">
        <template #header-actions>
            <Button v-if="data" size="small" text severity="secondary" :disabled="isRemovePending" @click="handleDelete">
                <Icon icon="material-symbols:close" />
                <span>Delete</span>
            </Button>

            <Button
                size="small"
                text
                as="router-link"
                :to="{ name: AppRouteName.knowledgeBaseArticleEdit, params: { itemId: data?.id } }"
            >
                <Icon icon="mdi:pencil" />
                <span>Edit</span>
            </Button>
        </template>
    </ArticleReadView>
</template>

<style scoped></style>
