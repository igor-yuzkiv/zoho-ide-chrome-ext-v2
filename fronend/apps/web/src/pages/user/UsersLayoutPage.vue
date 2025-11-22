<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { IconButton, ListBox, ListItem } from '@zoho-ide/ui-kit/components'
import { useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useDeleteUser } from '@/features/user/delete/lib/useDeleteUser.ts'
import { useUsersList } from '@/features/user/list'

const router = useRouter()
const { data: users } = useUsersList()
const { removeUserWithConfirmation } = useDeleteUser()
const openUserId = useRouteParams('userId')

// TODO: pagination, searching, filtering, prevent remove current user

function handleDeleteUser(userId: string, userName: string) {
    removeUserWithConfirmation(userId, userName).then((isRemoved) => {
        if (openUserId.value === userId && isRemoved) {
            // If the deleted user is currently open, navigate back to the users list
            router.push({ name: AppRouteName.usersIndex })
        }
    })
}
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
                            @click.prevent="handleDeleteUser(item.id, item.name)"
                        />
                    </template>
                </ListItem>
            </template>
        </ListBox>

        <router-view />
    </div>
</template>

<style scoped></style>
