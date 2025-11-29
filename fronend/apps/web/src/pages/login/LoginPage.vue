<script setup lang="ts">
import { ApiError } from '@zoho-ide/shared/api'
import { useAuthStore } from '@zoho-ide/shared/entities/auth'
import { LoginForm } from '@zoho-ide/shared/components'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

const authStore = useAuthStore()
const isLoading = ref(false)
const errorMessage = ref<string>('')
const router = useRouter()

async function handleClickSubmit(data: { email: string; password: string }) {
    try {
        isLoading.value = true
        await authStore.login(data.email, data.password)
        router.push({ name: AppRouteName.home }).catch(() => {})
    } catch (error) {
        errorMessage.value = error instanceof ApiError ? error.displayMessage : 'Login failed. Please try again.'
    }
    finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="flex items-center justify-center w-full h-full">
        <LoginForm class="bg-primary p-4 rounded-lg w-lg" @submit="handleClickSubmit" :is-loading="isLoading" :error-message />
    </div>
</template>

<style scoped></style>
