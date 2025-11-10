<script setup lang="ts">
import { Button } from "primevue";
import { CreateUserDialog, useCreateUser } from "@/features/user/create";
import { UsersDataTable, useUsersList } from "@/features/user/list";

const { data: users } = useUsersList();
const createUser = useCreateUser();
</script>

<template>
    <div class="flex flex-col w-full h-full overflow-hidden p-1">
        <div class="flex items-center justify-between py-1">
            <h1 class="text-xl font-bold">Users</h1>
            <div class="flex items-center gap-x-2">
                <Button @click="createUser.open()">New</Button>
            </div>
        </div>

        <div class="flex flex-col w-full h-full overflow-auto">
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
