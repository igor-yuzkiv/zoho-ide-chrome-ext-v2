<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { type IUser, useAuthStore, useToast } from '@zoho-ide/shared'
import { IconButton, ListBox, ListItem } from '@zoho-ide/shared'
import { useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useDeleteUser, useUsersList } from '@/features/user'

const toast = useToast()
const router = useRouter()
const { data: users } = useUsersList()
const { removeUserWithConfirmation } = useDeleteUser({
    onError: (displayMessage) => toast.error({ detail: displayMessage }),
})
const openUserId = useRouteParams('userId')
const authStore = useAuthStore()

// TODO: pagination, searching, filtering, prevent remove current user

function handleDeleteUser(userId: string, userName: string) {
    removeUserWithConfirmation(userId, userName).then((isRemoved) => {
        if (openUserId.value === userId && isRemoved) {
            router.push({ name: AppRouteName.usersIndex })
        }
    })
}

function handleSelectUser(user?: IUser) {
    if (user?.id) {
        router.push({ name: AppRouteName.userDetails, params: { userId: user.id } })
    }
}
</script>

<template>
    <ListBox
        class="min-w-lg shrink-0 px-2"
        :items="users"
        search-strategy="internal"
        :search-fields="['name', 'email']"
        :is-active-item="(item) => item.id === openUserId"
        @select-item="handleSelectUser"
    >
        <template #search-extra>
            <IconButton icon="ic:baseline-plus" text as="router-link" :to="{ name: AppRouteName.userCreate }" />
        </template>

        <template #item="{ item }">
            <ListItem
                as="router-link"
                active-class="app-list-item-active"
                :to="{ name: AppRouteName.userDetails, params: { userId: item.id } }"
                icon="fa:user"
            >
                <div>{{ item.name }}</div>
                <div class="app-secondary-text">{{ item.email }}</div>

                <template #actions>
                    <IconButton
                        class="p-0"
                        :disabled="item.id === authStore.user?.id"
                        text
                        icon="material-symbols:delete"
                        @click.prevent="handleDeleteUser(item.id, item.name)"
                    />
                </template>
            </ListItem>
        </template>
    </ListBox>
</template>

<style scoped></style>
