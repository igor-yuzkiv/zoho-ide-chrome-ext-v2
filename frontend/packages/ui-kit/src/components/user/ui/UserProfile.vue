<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { Avatar, Button, Popover } from 'primevue'
import { Icon } from '@iconify/vue'
import type { IUser } from '@zoho-ide/shared/contracts'

const emit = defineEmits<{
    (event: 'signOut'): void
    (event: 'signIn'): void
}>()

const props = defineProps<{ user: IUser | null }>()
const isAuthenticated = computed(() => !!props.user)

const popoverRef = useTemplateRef('popoverRef')

function handleClickActivator(event: MouseEvent) {
    if (!isAuthenticated.value) {
        emit('signIn')
        return
    }

    popoverRef.value?.toggle(event)
}

function handleClickSignOut() {
    popoverRef.value?.hide()
    emit('signOut')
}
</script>

<template>
    <div class="flex items-center gap-x-1 pr-2 hover:underline cursor-pointer" @click="handleClickActivator">
        <div>{{ isAuthenticated ? user?.name : 'Login' }}</div>
        <Icon v-if="isAuthenticated" class="text-2xl" :icon="'mdi:account-circle'" />
    </div>

    <Popover ref="popoverRef">
        <div class="flex flex-col w-sm">
            <div class="flex flex-col items-center gap-2 p-4 w-full text-center">
                <Avatar :label="user?.acronym" size="xlarge" shape="circle" />
                <h1 class="text-xl font-bold">{{ user?.name }}</h1>
                <span class="app-secondary-text">{{ user?.email }}</span>
            </div>

            <div class="border-t py-2 px-4 mt-2">
                <Button class="w-full" text size="small" severity="secondary" @click="handleClickSignOut">
                    <Icon icon="mdi:exit-run" />
                    Sign Out
                </Button>
            </div>
        </div>
    </Popover>
</template>

<style scoped></style>
