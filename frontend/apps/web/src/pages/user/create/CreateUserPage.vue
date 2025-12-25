<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
import { PageHeader, useToast } from '@zoho-ide/ui-kit'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { CreateUserForm, useCreateUser } from '@/features/user'

const toast = useToast()
const router = useRouter()
const { formData, formErrors, submit } = useCreateUser({
    onSuccess: ({ id }) => router.push({ name: AppRouteName.userDetails, params: { userId: id } }),
    onError: (displayMessage) => toast.error({ detail: displayMessage }),
})
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-2">
        <PageHeader title="New User">
            <template #actions>
                <Button label="Create User" text @click="submit" />
            </template>
        </PageHeader>

        <CreateUserForm
            class="flex flex-col w-full h-full p-2 app-card"
            v-model:form-data="formData"
            :form-errors="formErrors"
        />
    </div>
</template>

<style scoped></style>
