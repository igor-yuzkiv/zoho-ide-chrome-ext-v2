<script setup lang="ts">
import { useValidationErrors } from '@zoho-ide/backend-api/shared/errors/useValidationErrors.ts'
import { FieldContainer, PageHeader } from '@zoho-ide/ui-kit/components'
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import { MdEditor } from 'md-editor-v3'
import { Button, InputText } from 'primevue'
import { useCreateKbItem } from '@/features/knowledge-base/lib/useCreateKbItem.ts'

const { isDark } = useAppTheme()
const { formData, submit, formErrors } = useCreateKbItem()
const validationErrors = useValidationErrors(() => formErrors.value)
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <PageHeader title="New Article">
            <template #actions>
                <Button label="Create" text @click="submit" />
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

        <MdEditor
            v-model="formData.content"
            class="rounded-xl flex flex-grow app-card"
            style="height: 70vh"
            language="en-US"
            previewTheme="github"
            codeTheme="github"
            :theme="isDark ? 'dark' : 'light'"
        />
    </div>
</template>

<style scoped></style>
