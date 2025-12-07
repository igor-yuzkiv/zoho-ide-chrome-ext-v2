<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import {
    ArticleContentEditor,
    KnowledgeBaseItemForm,
    useKbItemDetailsQuery,
    useUpdateKbItem,
} from '@zoho-ide/knowledge-base'
import { PageHeader } from '@zoho-ide/shared'
import { Button } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'

const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetailsQuery(itemId)
const { formData, submit, formErrors } = useUpdateKbItem(data)
</script>

<template>
    <div v-if="data" class="flex flex-col h-full overflow-hidden w-full gap-1">
        <PageHeader :title="data.title">
            <template #actions>
                <Button
                    label="Cancel"
                    text
                    severity="secondary"
                    as="router-link"
                    :to="{ name: AppRouteName.kbItemDetails, params: { itemId: data.id } }"
                />
                <Button label="Save" text @click="submit" />
            </template>
        </PageHeader>

        <div class="flex flex-col w-full app-card p-2 gap-2">
            <KnowledgeBaseItemForm :form-errors="formErrors" v-model="formData" />
        </div>

        <ArticleContentEditor v-model="formData.content" class="flex-grow overflow-auto" :item-id="data.id" />
    </div>
</template>

<style scoped></style>
