<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ArticleEditView, useKbItemDetailsQuery, useUpdateKbItem } from '@zoho-ide/knowledge-base'
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'
import { useToast } from '@zoho-ide/ui-kit'
import { AppRouteName } from '@/app/router/app-routes.ts'

const router = useRouter()
const toast = useToast()
const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetailsQuery(itemId)
const { formData, submit } = useUpdateKbItem(data, {
    onError: (displayMessage) => toast.error({ detail: displayMessage }),
    onSuccess: ({ id }) => router.push({ name: AppRouteName.knowledgeBaseArticleDetails, params: { itemId: id } }),
})
</script>

<template>
    <ArticleEditView v-if="data" v-model="formData" :article-id="data.id">
        <template #header-actions>
            <Button
                size="small"
                text
                severity="secondary"
                as="router-link"
                :to="{ name: AppRouteName.knowledgeBaseArticleDetails, params: { itemId: data.id } }"
            >
                <Icon icon="material-symbols:close" />
                <span>Cancel</span>
            </Button>
            <Button size="small" text @click="submit">
                <Icon icon="material-symbols:save" />
                <span>Save</span>
            </Button>
        </template>
    </ArticleEditView>
</template>

<style scoped></style>
