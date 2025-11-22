<script setup lang="ts">
import { IconButton, ListBox, ListItem } from '@zoho-ide/ui-kit/components'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useDeleteUser } from '@/features/user/delete/lib/useDeleteUser.ts'
import { useUsersList } from '@/features/user/list'

const { data: users } = useUsersList()
const { removeUserWithConfirmation } = useDeleteUser()
</script>

<template>
    <div class="flex h-full w-full overflow-hidden gap-2 p-1">
        <ListBox
            class="shrink-0 bg-primary p-2 rounded-lg w-lg"
            :items="users"
            searchable
            :search-fields="['name', 'email']"
        >
            <template #search-extra>
                <IconButton icon="ic:baseline-plus" text as="router-link" :to="{ name: AppRouteName.userCreate }" />
            </template>

            <template #item="{ item }">
                <ListItem
                    as="router-link"
                    :to="{ name: AppRouteName.userDetails, params: { userId: item.id } }"
                    icon="fa:user"
                >
                    <div>{{ item.name }}</div>
                    <div class="app-secondary-text">{{ item.email }}</div>

                    <template #actions>
                        <IconButton
                            text
                            icon="material-symbols:delete"
                            @click.prevent="removeUserWithConfirmation(item.id, item.name)"
                        />
                    </template>
                </ListItem>
            </template>
        </ListBox>

        <router-view />
    </div>
</template>

<style scoped></style>
