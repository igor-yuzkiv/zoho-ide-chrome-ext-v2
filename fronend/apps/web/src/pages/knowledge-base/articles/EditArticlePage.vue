<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { useValidationErrors } from '@zoho-ide/backend-api/shared/errors/useValidationErrors.ts'
import { FieldContainer, PageHeader } from '@zoho-ide/ui-kit/components'
import { ArticleContentEditor } from '@zoho-ide/ui-kit/widgets'
import { Button, InputText } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useKbItemDetails } from '@/features/knowledge-base'
import { useUpdateKbItem } from '@/features/knowledge-base/lib/useUpdateKbItem.ts'

const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetails(itemId)
const { formData, submit, formErrors } = useUpdateKbItem(data)
const validationErrors = useValidationErrors(() => formErrors.value)
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

        <div class="flex flex-col w-full app-card p-2">
            <FieldContainer label="Name" input-id="article_name" :error-message="validationErrors.get('title')">
                <InputText
                    fluid
                    placeholder="Enter article name"
                    v-model="formData.title"
                    :invalid="validationErrors.has('title')"
                />
            </FieldContainer>
        </div>

        <ArticleContentEditor v-model="formData.content" class="flex-grow" />
    </div>
</template>

<style scoped></style>
