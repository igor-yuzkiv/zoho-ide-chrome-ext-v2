<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { GlobalSearchDialog, useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useAppStateStore } from '@/app/store/useAppStateStore.ts'
import { useCapabilitiesCacheManager } from '@/entities/capability/composables/useCapabilitiesCacheManager.ts'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'
import { CapabilitiesMenu } from '@/features/capability/capabilities-menu'

const router = useRouter()
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
    <div v-if="provider" class="flex h-full w-full flex-col overflow-hidden">
        <Splitter
            class="flex h-full w-full overflow-hidden bg-transparent"
            :pt="{ gutter: { class: 'bg-transparent' } }"
        >
            <SplitterPanel class="flex h-full overflow-hidden" :size="1" style="min-width: 10rem">
                <CapabilitiesMenu :providerId="providerId" :capabilities="providerCapabilities" />

                <div class="flex flex-col w-full h-full overflow-hidden app-card">
                    <router-view name="menu" />
                </div>
            </SplitterPanel>
            <SplitterPanel class="flex flex-col w-full h-full overflow-hidden">
                <router-view />
            </SplitterPanel>
        </Splitter>
    </div>

    <GlobalSearchDialog />
</template>

<style scoped></style>
