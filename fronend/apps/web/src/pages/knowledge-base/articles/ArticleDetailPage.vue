<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { PageHeader } from '@zoho-ide/shared'
import { ArticleView, useKnowledgeBaseItemDetailsQuery } from '@zoho-ide/knowledge-base'
import { Button } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'

const itemId = useRouteParams<string>('itemId')
const { data } = useKnowledgeBaseItemDetailsQuery(itemId)
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <PageHeader :title="data?.title">
            <template #actions>
                <Button
                    v-if="data"
                    label="Edit"
                    text
                    as="router-link"
                    :to="{ name: AppRouteName.kbItemEdit, params: { itemId: data?.id } }"
                />
            </template>
        </PageHeader>

        <ArticleView v-if="data" :article="data" class="px-3"/>
    </div>
</template>

<style scoped></style>
