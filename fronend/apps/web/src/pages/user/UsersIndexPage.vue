<script setup lang="ts">
import { IconButton } from '@zoho-ide/ui-kit/components'
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import { Icon } from '@iconify/vue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useUsersList } from '@/features/user/list'

const { data: users } = useUsersList()
const searchTerm = ref('')

//TODO: move to backend filtering
const usersForDisplay = computed(() => {
    if (!searchTerm.value || !users.value) {
        return users.value || []
    }

    return users.value.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})
</script>

<template>
    <div class="flex h-full w-full overflow-hidden gap-x-1 p-1">
        <div class="flex flex-col h-full overflow-x-hidden overflow-y-auto bg-primary p-2 rounded-lg w-lg">
            <div class="flex items-center gap-x-2 border-b">
                <InputText
                    v-model.lazy="searchTerm"
                    size="small"
                    class="w-full bg-primary rounded-none border-none"
                    placeholder="Start typing to search workflows..."
                />

                <IconButton icon="ic:baseline-plus" text as="router-link" :to="{ name: AppRouteName.userCreate }" />
            </div>

            <div class="flex h-full flex-col overflow-x-hidden overflow-y-auto mt-2">
                <ul class="w-full">
                    <li v-for="user in usersForDisplay" :key="user.id">
                        <router-link
                            :to="{ name: AppRouteName.userDetails, params: { id: user.id } }"
                            class="flex items-center w-full cursor-pointer hover:bg-selection px-1 rounded gap-x-2 w-full"
                            active-class="app-list-item-active"
                        >
                            <Icon icon="fa:user" />
                            <div>{{ user.name }}</div>
                            <div class="app-secondary-text">{{ user.email }}</div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <router-view />
    </div>
</template>

<style scoped></style>
