<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { attachToEntityRequest } from '@zoho-ide/attachments'
import {
    ArticleContentEditor,
    type EditorImageUploadPayload,
    KnowledgeBaseItemEntityType,
} from '@zoho-ide/knowledge-base'
import { FieldContainer, PageHeader } from '@zoho-ide/shared'
import { useValidationErrors } from '@zoho-ide/shared'
import { Button, InputText } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useKbItemDetails } from '@/features/knowledge-base'
import { useUpdateKbItem } from '@/features/knowledge-base/lib/useUpdateKbItem.ts'

const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetails(itemId)
const { formData, submit, formErrors } = useUpdateKbItem(data)
const validationErrors = useValidationErrors(() => formErrors.value)

async function handleUploadImages(payload: EditorImageUploadPayload) {
    console.log('Uploading images:', payload)
    if (!payload.files.length || !data.value) {
        return
    }

    const responses = await Promise.all(
        payload.files.map((file) => {
            return attachToEntityRequest(
                KnowledgeBaseItemEntityType,
                data.value!.id,
                file,
                'knowledge_base_article_content_image'
            )
        })
    )

    const uploadedImageUrls = responses.map((res) => res.public_link)
    payload.callback(uploadedImageUrls)
}
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

        <ArticleContentEditor
            v-model="formData.content"
            :item-id="data.id"
            class="flex-grow overflow-auto"
            @upload-img="handleUploadImages"
        />
    </div>
</template>

<style scoped></style>
