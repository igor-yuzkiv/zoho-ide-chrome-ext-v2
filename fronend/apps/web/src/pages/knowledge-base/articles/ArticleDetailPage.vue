<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { PageHeader } from '@zoho-ide/ui-kit/components'
import { ArticleView } from '@zoho-ide/ui-kit/widgets'
import { Button } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useKbItemDetails } from '@/features/knowledge-base'

const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetails(itemId)
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

        <ArticleView v-if="data" :article="data" />
    </div>
</template>

<style scoped></style>
