<script setup lang="ts">
import { CreateUserDialog, useCreateUser } from '@/features/user/create'
import { UsersDataTable, useUsersList } from '@/features/user/list'

const { data: users } = useUsersList()
const createUser = useCreateUser()
</script>

<template>
    <div class="flex flex-col w-full h-full">
        <div class="flex flex-col w-full h-full overflow-auto bg-primary rounded-lg">
            <UsersDataTable :users="users" />
        </div>
    </div>

    <CreateUserDialog
        v-model:visible="createUser.visible.value"
        v-model:form-data="createUser.formData.value"
        :is-loading="createUser.isPending.value"
        :form-errors="createUser.formErrors.value"
        @submit="createUser.submit"
    />
</template>

<style scoped></style>
