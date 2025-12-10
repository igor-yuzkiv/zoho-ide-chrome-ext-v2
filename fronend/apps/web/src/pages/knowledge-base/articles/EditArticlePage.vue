<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ArticleEditView, useKbItemDetailsQuery, useUpdateKbItem } from '@zoho-ide/knowledge-base'
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'
import { AppRouteName } from '@/app/router/app-routes.ts'

const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetailsQuery(itemId)
const { formData, submit, formErrors } = useUpdateKbItem(data)
</script>

<template>
    <ArticleEditView v-if="data" v-model="formData" :form-errors="formErrors">
        <template #header-actions>
            <Button
                size="small"
                text
                severity="secondary"
                as="router-link"
                :to="{ name: AppRouteName.kbItemDetails, params: { itemId: data.id } }"
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
