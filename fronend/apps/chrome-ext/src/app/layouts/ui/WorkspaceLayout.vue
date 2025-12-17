<script setup lang="ts">
import { TopMenuItem, useConfirm, useToast } from '@zoho-ide/shared'
import { format } from 'date-fns'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Splitter, SplitterPanel } from 'primevue'
import { Icon } from '@iconify/vue'
import { GlobalSearchDialog, useGlobalSearch } from '@/shared/libs/global-search'
import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilitiesCacheManager } from '@/entities/capability/composables/useCapabilitiesCacheManager.ts'
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'
import { CapabilitiesMenu } from '@/widgets/capabilities-menu'
import { AppFooter } from '@/widgets/app-footer'
import { AppTopMenu } from '@/widgets/app-top-menu'

const confirm = useConfirm()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const logger = useLogger('WorkspaceLayout')
const {
    id: providerId,
    data: provider,
    isOnline: isProviderOnline,
    capabilities: providerCapabilities,
} = useCurrentProvider()

const lastSynced = computed(() => {
    if (!provider.value?.lastSyncedAt) {
        return 'Never'
    }

    return format(new Date(provider.value.lastSyncedAt), 'yyyy-MM-dd HH:mm')
})

const { bootstrap: bootstrapProviderCache, clearProviderCache, isCachingInProgress } = useCapabilitiesCacheManager()
const { bootstrap: bootstrapGlobalSearch } = useGlobalSearch()

function handleClickClearCache() {
    if (isCachingInProgress.value || !isProviderOnline.value) {
        return
    }

    confirm.require({
        header: 'Clear Cache',
        message: 'Are you sure you want to clear the cache for this provider?',
        accept: async () => {
            if (!provider.value) {
                return
            }

            try {
                await clearProviderCache(provider.value.id)
                await bootstrapProviderCache(provider.value)
                await bootstrapGlobalSearch({ provider: provider.value })
            } catch (e) {
                logger.error('Failed to clear cache', e)
                toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to clear cache.' })
            }
        },
    })
}

onMounted(async () => {
    if (!provider.value) {
        router.push({ name: AppRouteName.error })
        return
    }

    try {
        await bootstrapProviderCache(provider.value)
        await bootstrapGlobalSearch({ provider: provider.value })
    } catch (e) {
        logger.error('Failed to bootstrap caches', e)
        router.push({ name: AppRouteName.error })
    }
})
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <AppTopMenu>
            <template #right-content>
                <TopMenuItem
                    v-if="isProviderOnline"
                    title="Clear Cache"
                    @click="handleClickClearCache"
                    :disabled="isCachingInProgress"
                />
            </template>
        </AppTopMenu>

        <main v-if="provider" class="flex h-full w-full overflow-hidden px-2">
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

        <AppFooter>
            <div v-if="isCachingInProgress" class="flex items-center gap-x-1 text-gray-500 text-sm">
                <Icon icon="line-md:loading-loop" />
                <span>Caching...</span>
            </div>

            <div v-else class="text-gray-500 text-sm">Last synced: {{ lastSynced }}</div>
        </AppFooter>
    </div>

    <GlobalSearchDialog />
</template>

<style scoped></style>
