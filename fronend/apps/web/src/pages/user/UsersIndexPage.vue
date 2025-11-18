<script setup lang="ts">
import { ListBox, ListItem } from '@zoho-ide/ui-kit/components'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useUsersList } from '@/features/user/list'

const { data: users } = useUsersList()
</script>

<template>
    <div class="flex h-full w-full overflow-hidden gap-x-1 p-1">
        <ListBox class="bg-primary p-2 rounded-lg w-lg" :items="users" searchable :search-fields="['name', 'email']">
            <template #item="{ item }">
                <ListItem
                    as="router-link"
                    :to="{ name: AppRouteName.userDetails, params: { id: item.id } }"
                    icon="fa:user"
                >
                    <div>{{ item.name }}</div>
                    <div class="app-secondary-text">{{ item.email }}</div>
                </ListItem>
            </template>
        </ListBox>
        <router-view />
    </div>
</template>

<style scoped></style>
