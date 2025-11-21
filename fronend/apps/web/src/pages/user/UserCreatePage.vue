<script setup lang="ts">
import { PageHeader } from '@zoho-ide/ui-kit/components'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCreateUser } from '@/features/user/create'
import CreateUserForm from '@/features/user/create/ui/CreateUserForm.vue'

const { formData, formErrors, submit, data: newUser, isSuccess } = useCreateUser()
const router = useRouter()

watchEffect(() => {
    if (isSuccess.value && newUser.value?.id) {
        router.push({ name: AppRouteName.userDetails, params: { id: newUser.value.id } })
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
        <div class="flex flex-col w-full h-full bg-primary p-2 rounded-lg">
            <CreateUserForm v-model:form-data="formData" :form-errors="formErrors" />
        </div>
    </div>
</template>

<style scoped></style>
