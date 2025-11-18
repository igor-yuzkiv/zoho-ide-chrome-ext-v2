<script setup lang="ts" generic="T extends Record<string, unknown>">
import ListItem from './ListItem.vue'
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'

defineEmits<{
    (e: 'itemClick', item: T): void
}>()
const props = withDefaults(
    defineProps<{
        items: T[]
        itemKey?: string
        itemTitle?: string
        itemIcon?: string
        defaultIcon?: string
        searchable?: boolean
        searchFields?: string[]
        searchPlaceholder?: string
        tooltipField?: keyof T
        itemAttributes?: Record<string, unknown>
    }>(),
    {
        itemKey: 'id',
        itemTitle: 'title',
        defaultIcon: 'icon-park-outline:dot',
        searchable: false,
        searchPlaceholder: 'Start typing to search...',
        searchFields: () => ['title'],
    }
)

const searchTerm = ref('')

const getItemSearchValue = (item: T): string => {
    if (!props.searchFields || props.searchFields.length === 0) {
        return ''
    }

    return props.searchFields
        .map((field) => item[field] || '')
        .join(' ')
        .toLowerCase()
        .trim()
}

const mapItem = (item: T) => {
    const title = item[props.itemTitle] as string
    console.log(getItemSearchValue(item))

    return {
        original: item,
        key: item[props.itemKey] as string,
        title: title,
        icon: props.itemIcon ? (item[props.itemIcon] as string) : props.defaultIcon,
        tooltip: props.tooltipField ? (item[props.tooltipField] as string) : title,
        searchValue: getItemSearchValue(item),
    }
}

const itemsForDisplay = computed(() => {
    const mappedItems = props.items.map((item) => mapItem(item))
    if (props.searchable && searchTerm.value) {
        return mappedItems.filter((item) => item.searchValue.includes(searchTerm.value.toLowerCase().trim()))
    }

    return mappedItems
})
</script>

<template>
    <div class="flex h-full flex-col overflow-x-hidden overflow-y-auto">
        <div v-if="searchable" class="flex items-center gap-x-2 border-b mb-2">
            <InputText
                v-model.lazy="searchTerm"
                size="small"
                class="w-full bg-primary rounded-none border-none"
                placeholder="Start typing to search workflows..."
            />

            <slot name="search-extra" />
        </div>

        <div class="flex h-full flex-col overflow-x-hidden overflow-y-auto">
            <ul v-if="itemsForDisplay.length" class="w-full">
                <li v-for="item in itemsForDisplay" :key="item.key">
                    <slot name="item" :item="item.original">
                        <ListItem
                            @click="$emit('itemClick', item.original)"
                            :title="item.title"
                            :icon="item.icon || defaultIcon"
                            :tooltip="item.tooltip"
                            v-bind="itemAttributes"
                        />
                    </slot>
                </li>
            </ul>

            <slot v-else name="empty">
                <div class="flex h-full w-full items-center justify-center p-4 app-secondary-text">No items found.</div>
            </slot>
        </div>
    </div>
</template>

<style scoped></style>
