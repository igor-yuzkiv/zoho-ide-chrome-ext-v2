<script setup lang="ts">
import { PageHeader } from '@zoho-ide/ui-kit/components'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCreateUser, CreateUserForm } from '@/features/user'

const { formData, formErrors, submit, data: newUser, isSuccess } = useCreateUser()
const router = useRouter()

watchEffect(() => {
    if (isSuccess.value && newUser.value?.id) {
        router.push({ name: AppRouteName.userDetails, params: { userId: newUser.value.id } })
    }
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
