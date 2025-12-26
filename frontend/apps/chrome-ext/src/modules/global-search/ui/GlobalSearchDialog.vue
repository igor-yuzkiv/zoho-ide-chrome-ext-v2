<script setup lang="ts">
import SearchResultsList from './SearchResultsList.vue'
import { useGlobalSearchEngine } from '@/modules/global-search/composables/useGlobalSearchEngine.ts'
import { useGlobalSearchSettings } from '@/modules/global-search/composables/useGlobalSearchSettings.ts'
import { GlobalSearchPluginSymbol } from '@/modules/global-search/global-search.constants.ts'
import type {
    GlobalSearchDocument,
    GlobalSearchOpenParams,
    IGlobalSearchService,
} from '@/modules/global-search/global-search.types.ts'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { type Component, computed, inject, ref } from 'vue'
import { nextTick, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { InputText } from 'primevue'
import Select from 'primevue/select'
import { IconButton } from '@zoho-ide/ui-kit'

const router = useRouter()
const pluginService = inject<IGlobalSearchService>(GlobalSearchPluginSymbol)
const pluginSettings = useGlobalSearchSettings()
const dialogRef = useTemplateRef('global-search-dialog-ref')
const inputRef = useTemplateRef('global-search-input-ref')
const visible = ref(false)
const engine = useGlobalSearchEngine()
const searchFieldOptions = [
    { label: 'Title', value: 'title' },
    { label: 'Content', value: 'content' },
]

const selectedItem = ref<GlobalSearchDocument | null>(null)
const previewComponent = computed<string | Component | undefined>(() => {
    if (!selectedItem.value || !selectedItem.value.module) {
        return
    }

    const module = pluginSettings.findModuleByName(selectedItem.value.module)
    if (!module || !module?.previewComponent) {
        return
    }

    return module.previewComponent
})

function hideDialog() {
    visible.value = false
}

function openDialog(params?: GlobalSearchOpenParams) {
    if (params) {
        engine.searchQuery.value = params.query ? params.query : ''
    }

    visible.value = true
}

function handleListItemClick(item: GlobalSearchDocument) {
    selectedItem.value = item
}

function handleClickViewItemDetails(item: GlobalSearchDocument) {
    const module = pluginSettings.findModuleByName(item.module)
    if (!module || !module?.getNavigationRoute) {
        return
    }

    const route = module.getNavigationRoute(item)
    if (route) {
        hideDialog()
        router.push(route)
    }
}

watch(visible, (newValue) => {
    if (newValue) {
        // @ts-expect-error Property $el does not exist on type
        nextTick(() => inputRef.value?.$el?.focus())
    }
})
onKeyStroke(pluginSettings.shortcutKeys.value, (e) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        visible.value = true
    }
})
onClickOutside(dialogRef, hideDialog, { ignore: ['.p-select-list-container'] })
onKeyStroke('Escape', hideDialog)
pluginService?.onOpen(openDialog)
pluginService?.onClose(hideDialog)
</script>

<template>
    <div v-if="visible" class="fixed z-[1000] top-0 left-0 h-full w-full">
        <div
            class="mx-auto mt-20 flex max-h-[70vh] w-4xl flex-col overflow-hidden bg-secondary rounded-lg shadow-lg border"
            ref="global-search-dialog-ref"
        >
            <div class="flex items-center gap-x-1 p-1">
                <IconButton icon="material-symbols:close" text @click="visible = false" />

                <InputText
                    class="w-full rounded-lg border-0 focus:border-0 bg-transparent p-1 text-sm shadow-none"
                    placeholder="Start typing to search..."
                    ref="global-search-input-ref"
                    v-model="engine.searchQuery.value"
                />

                <div class="flex items-center gap-x-1">
                    <Select
                        class="border-none bg-transparent shadow-none"
                        :options="searchFieldOptions"
                        v-model="engine.searchByField.value"
                        option-label="label"
                        option-value="value"
                        size="small"
                    />
                </div>
            </div>

            <div class="flex h-full w-full flex-col overflow-auto">
                <SearchResultsList
                    class="overflow-auto"
                    :results="engine.data.value || []"
                    :selectedItemId="selectedItem?.id"
                    @item:view="handleClickViewItemDetails"
                    @item:click="handleListItemClick"
                />

                <div
                    v-if="selectedItem && previewComponent"
                    class="flex flex-col w-full shrink-0 h-[16rem] mt-2 border-t px-1 overflow-auto"
                >
                    <component
                        :is="previewComponent"
                        :document="selectedItem"
                        :search-options="{ query: engine.searchQuery.value, field: engine.searchByField.value }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
