<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { LoadingOverlay } from '@/shared/components/loading'
import { useBrowserTabsStore } from '@/shared/libs/browser/store/useBrowserTabsStore.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useAppStateStore } from '@/app/store/useAppStateStore.ts'
import { useAppThemeStore } from '@/app/store/useAppThemeStore.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'
import { AppFooter } from '@/widgets/app-footer'
import { AppTopMenu } from '@/widgets/app-top-menu'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'

const appState = useAppStateStore()
const appTheme = useAppThemeStore()
const tabs = useBrowserTabsStore()
const providersStore = useProvidersStore()
const router = useRouter()
const isInitialized = ref(false)

watch(() => tabs.items, providersStore.handleChangeBrowserTabs)

onMounted(async () => {
    try {
        appState.showLoadingOverlay()
        appTheme.bootstrap()
        providersStore.bootstrap()
        await tabs.bootstrap()
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
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <AppTopMenu />

        <main v-if="isInitialized" class="flex h-full w-full flex-col overflow-hidden">
            <router-view />
        </main>

        <AppFooter />
    </div>

    <LoadingOverlay v-if="appState.loadingOverlay" />
    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
