<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { GlobalSearchDialog, useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useAppStateStore } from '@/app/store/useAppStateStore.ts'
import { useCapabilitiesCacheManager } from '@/entities/capability/composables/useCapabilitiesCacheManager.ts'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'
import { CapabilitiesMenu } from '@/features/capability/capabilities-menu'
import { AppFooter } from '@/widgets/app-footer'
import { AppTopMenu } from '@/widgets/app-top-menu'

const router = useRouter()
const route = useRoute()
const appState = useAppStateStore()
const providers = useProvidersStore()
const capabilities = useCapabilitiesConfig()

const providerId = useRouteParams<string>('providerId')
const provider = computed(() => providers.findById(providerId.value))
const providerCapabilities = computed(() => {
    return provider.value ? capabilities.byProvider(provider.value).filter((c) => !c?.hideInMenu) : []
})

const { bootstrap: bootstrapProviderCache } = useCapabilitiesCacheManager()
const { bootstrap: bootstrapGlobalSearch } = useGlobalSearch()

onMounted(async () => {
    if (!provider.value) {
        router.push({ name: AppRouteName.error }).catch(console.error)
        return
    }

    try {
        appState.showLoadingOverlay()

        await bootstrapProviderCache(provider.value)
        await bootstrapGlobalSearch({ provider: provider.value })
    } catch (e) {
        console.error(e)
        router.push({ name: AppRouteName.error }).catch(console.error)
    } finally {
        appState.hideLoadingOverlay()
    }
})
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <AppTopMenu />

        <main v-if="provider" class="flex h-full w-full overflow-hidden">
            <CapabilitiesMenu :providerId="providerId" :capabilities="providerCapabilities" />

            <Splitter
                class="flex h-full w-full overflow-hidden bg-transparent"
                :pt="{ gutter: { class: 'bg-transparent' } }"
            >
                <SplitterPanel
                    v-if="!route.meta?.hideSidebarMenu"
                    class="flex h-full overflow-hidden"
                    :size="5"
                    style="min-width: 10rem; max-width: 50rem"
                >
                    <div class="flex flex-col w-full h-full overflow-hidden app-card">
                        <router-view name="menu" />
                    </div>
                </SplitterPanel>
                <SplitterPanel class="flex flex-col w-full h-full overflow-hidden">
                    <router-view />
                </SplitterPanel>
            </Splitter>
        </main>

        <AppFooter />
    </div>

    <GlobalSearchDialog />
</template>

<style scoped></style>
