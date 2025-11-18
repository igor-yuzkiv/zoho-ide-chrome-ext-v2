<script setup lang="ts">
import { useCreateUser } from '@/features/user/create'
import CreateUserForm from '@/features/user/create/ui/CreateUserForm.vue'
import { PageHeader } from '@zoho-ide/ui-kit/components'

const { formData, formErrors } = useCreateUser()
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <PageHeader title="New User"/>
        <div class="flex flex-col w-full h-full bg-primary p-2 rounded-lg">
            <CreateUserForm v-model:form-data="formData" :form-errors="formErrors" />
        </div>
    </div>
</template>

<style scoped></style>
