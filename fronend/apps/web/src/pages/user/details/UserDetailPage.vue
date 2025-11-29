<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { PageHeader } from '@zoho-ide/ui-kit/components'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar, Button } from 'primevue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { UpdateUserForm, useUpdateUser, useUserDetails } from '@/features/user'

const router = useRouter()
const userId = useRouteParams<string>('userId')
const { data: user, isError } = useUserDetails(userId)
const { submit, formData, formErrors } = useUpdateUser(user)

watch(isError, (newValue) => {
    if (newValue) {
        router.replace({ name: AppRouteName.usersIndex })
    }
})
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <PageHeader :title="user?.name" :description="user?.email">
            <template #prepend>
                <Avatar
                    :label="user?.acronym"
                    size="large"
                    class="mr-2 font-bold"
                    style="background-color: #dee9fc; color: #1a2551"
                    shape="circle"
                />
            </template>

            <template #actions>
                <Button label="Update User" text @click="submit" />
            </template>
        </PageHeader>

        <div class="flex flex-col w-full h-full app-card p-2">
            <UpdateUserForm v-model:form-data="formData" :form-errors="formErrors" />
        </div>
    </div>
</template>

<style scoped></style>
