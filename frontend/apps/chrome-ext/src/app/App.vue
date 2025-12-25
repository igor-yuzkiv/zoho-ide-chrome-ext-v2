<script setup lang="ts">
import { useAuthStore } from '@zoho-ide/shared'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { LoadingOverlay } from '@zoho-ide/ui-kit'
import { useAppThemeStore } from '@zoho-ide/ui-kit'
import { useBrowserTabsStore } from '@/shared/libs/browser/store/useBrowserTabsStore.ts'
import { AppLayoutComponent } from '@/app/layouts/app-layouts.config.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useAppStateStore } from '@/app/store/useAppStateStore.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'

const authStore = useAuthStore()

const appState = useAppStateStore()
const tabs = useBrowserTabsStore()
const providersStore = useProvidersStore()
const router = useRouter()
const route = useRoute()
const isInitialized = ref(false)

const layoutComponent = computed(() => {
    const layoutName = route.meta?.layout
    if (layoutName && layoutName in AppLayoutComponent) {
        return AppLayoutComponent[layoutName]
    }

    return AppLayoutComponent.default
})

watch(() => tabs.items, providersStore.handleChangeBrowserTabs)
useAppThemeStore().initialize()
onMounted(async () => {
    try {
        appState.showLoadingOverlay()
        providersStore.bootstrap()
        await tabs.bootstrap()
        await authStore.ensureUser().catch(console.error)
    } catch (e) {
        console.error(e)
        router.push({ name: AppRouteName.error }).catch(console.error)
    } finally {
        isInitialized.value = true
        appState.hideLoadingOverlay()
    }
})
</script>

<template>
    <component v-if="isInitialized" :is="layoutComponent" />

    <LoadingOverlay v-if="appState.loadingOverlay || !isInitialized" />
    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
