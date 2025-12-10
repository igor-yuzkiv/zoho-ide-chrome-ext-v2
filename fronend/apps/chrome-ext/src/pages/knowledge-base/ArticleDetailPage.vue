<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ArticleReadView, useKbItemDetailsQuery } from '@zoho-ide/knowledge-base'
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'
import { AppRouteName } from '@/app/router/app-routes.ts'

const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetailsQuery(itemId)
</script>

<template>
    <ArticleReadView v-if="data" :article="data">
        <template #header-actions>
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
