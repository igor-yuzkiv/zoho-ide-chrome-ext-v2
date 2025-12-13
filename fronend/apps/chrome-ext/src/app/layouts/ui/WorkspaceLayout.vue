<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { useConfirm, useToast } from '@zoho-ide/shared'
import { format } from 'date-fns'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Splitter, SplitterPanel } from 'primevue'
import { Icon } from '@iconify/vue'
import { GlobalSearchDialog, useGlobalSearch } from '@/shared/libs/global-search'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCapabilitiesCacheManager } from '@/entities/capability/composables/useCapabilitiesCacheManager.ts'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'
import { CapabilitiesMenu } from '@/features/capability/capabilities-menu'
import { AppFooter } from '@/widgets/app-footer'
import { AppTopMenu } from '@/widgets/app-top-menu'

const confirm = useConfirm()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const providers = useProvidersStore()
const capabilities = useCapabilitiesConfig()

const providerId = useRouteParams<string>('providerId')
const provider = computed(() => providers.findById(providerId.value))
const providerCapabilities = computed(() => {
    return provider.value ? capabilities.byProvider(provider.value).filter((c) => !c?.hideInMenu) : []
})
const isProviderOnline = computed(() => Boolean(provider.value?.tabId))

const lastSynced = computed(() => {
    if (!provider.value?.lastSyncedAt) {
        return 'Never'
    }

    return format(new Date(provider.value.lastSyncedAt), 'yyyy-MM-dd HH:mm')
})

const { bootstrap: bootstrapProviderCache, clearProviderCache, isSynchronizing } = useCapabilitiesCacheManager()
const { bootstrap: bootstrapGlobalSearch } = useGlobalSearch()

function handleClickClearCache() {
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
                console.error(e)
                toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to clear cache.' })
            }
        },
    })
}

onMounted(async () => {
    if (!provider.value) {
        router.push({ name: AppRouteName.error }).catch(console.error)
        return
    }

    try {
        await bootstrapProviderCache(provider.value)
        await bootstrapGlobalSearch({ provider: provider.value })
    } catch (e) {
        console.error(e)
        router.push({ name: AppRouteName.error }).catch(console.error)
    }
})
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <AppTopMenu />

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
            <template #start>
                <Button
                    :disabled="isSynchronizing || !isProviderOnline"
                    @click="handleClickClearCache"
                    severity="secondary"
                    text
                    size="small"
                    class="px-2 py-0"
                >
                    Reset Cache
                </Button>
            </template>

            <template #end>
                <div v-if="isSynchronizing" class="flex items-center gap-x-1 text-gray-500 text-sm">
                    <Icon icon="line-md:loading-loop" />
                    <span>Synchronizing...</span>
                </div>
                <span v-else class="text-gray-500 text-sm">Last synced: {{ lastSynced }}</span>
            </template>
        </AppFooter>
    </div>

    <GlobalSearchDialog />
</template>

<style scoped></style>
