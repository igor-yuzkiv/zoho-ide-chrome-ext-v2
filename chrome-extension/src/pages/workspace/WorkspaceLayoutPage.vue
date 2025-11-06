<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useAppStateStore } from '@/app/store/useAppStateStore.ts'
import { useCapabilities } from '@/core/composables/useCapabilities.ts'
import { useProviderCacheManager } from '@/core/composables/useProviderCacheManager.ts'
import { useProvidersStore } from '@/core/store/useProvidersStore.ts'
import { CapabilitiesMenu } from '@/widgets/capability/capabilities-menu'
import { WorkspaceFooter } from '@/widgets/workspace/workspace-footer'
import { WorkspaceTopMenu } from '@/widgets/workspace/workspace-top-menu'
import { GlobalSearchDialog, useGlobalSearch } from '@/shared/libs/global-search'

const router = useRouter()
const appState = useAppStateStore()
const providers = useProvidersStore()
const capabilities = useCapabilities()

const providerId = useRouteParams<string>('providerId')
const provider = computed(() => providers.findById(providerId.value))
const providerCapabilities = computed(() => {
    return provider.value ? capabilities.byProvider(provider.value).filter((c) => !c?.hideInMenu) : []
})

const { bootstrap: bootstrapProviderCache } = useProviderCacheManager()
const { bootstrap: bootstrapGlobalSearch } = useGlobalSearch();

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
        <div class="flex h-full w-full overflow-hidden">
            <div class="flex h-full overflow-hidden shrink-0">
                <div class="flex flex-col">
                    <router-link
                        :to="{ name: AppRouteName.workspaceIndex, params: { providerId: providerId } }"
                        class="flex px-2 py-3 items-center justify-center"
                    >
                        <Icon class="h-4 w-4" :icon="provider.serviceIcon" />
                    </router-link>

                    <CapabilitiesMenu :providerId="providerId" :capabilities="providerCapabilities" />
                </div>

                <div class="flex flex-col w-full h-full overflow-hidden bg-background">
                    <router-view name="menu" />
                </div>
            </div>

            <div class="flex flex-col w-full h-full overflow-hidden">
                <WorkspaceTopMenu :provider="provider" />
                <div class="flex flex-col w-full h-full overflow-hidden px-2">
                    <router-view />
                </div>
                <WorkspaceFooter />
            </div>
        </div>
    </div>

    <GlobalSearchDialog />
</template>

<style scoped></style>
