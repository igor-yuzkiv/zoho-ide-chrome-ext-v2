<script setup lang="ts">
import { useCapabilitiesSettings } from '@/entities/capability/composables/useCapabilitiesSettings.ts'
import { useProviderCacheManager } from '@/entities/provider/composables/useProviderCacheManager.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'
import { useRouteParams } from '@vueuse/router'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { GlobalSearchDialog, useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useAppStateStore } from '@/app/store/useAppStateStore.ts'
import { CapabilitiesMenu } from '@/features/capability/capabilities-menu'
import { WorkspaceTopMenu } from '@/widgets/workspace-top-menu'

const router = useRouter()
const appState = useAppStateStore()
const providers = useProvidersStore()
const capabilities = useCapabilitiesSettings()

const providerId = useRouteParams<string>('providerId')
const provider = computed(() => providers.findById(providerId.value))
const providerCapabilities = computed(() => {
    return provider.value ? capabilities.byProvider(provider.value).filter((c) => !c?.hideInMenu) : []
})

const { bootstrap: bootstrapProviderCache } = useProviderCacheManager()
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
        <WorkspaceTopMenu :provider="provider" />

        <div class="flex h-full w-full overflow-hidden gap-x-1 p-1">
            <div class="flex h-full overflow-hidden shrink-0">
                <CapabilitiesMenu :providerId="providerId" :capabilities="providerCapabilities" />

                <div class="flex flex-col w-full h-full overflow-hidden bg-primary rounded-lg">
                    <router-view name="menu" />
                </div>
            </div>

            <div class="flex flex-col w-full h-full overflow-hidden">
                <router-view />
            </div>
        </div>
    </div>

    <GlobalSearchDialog />
</template>

<style scoped></style>
