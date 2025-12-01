<script setup lang="ts">
import { useTagsSearchQuery } from '../../queries'
import { ITagEntity } from '../../types'
import TagsChipList from '../chip/TagsChipList.vue'
import CreateNewTag from './CreateNewTag.vue'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useId, useTemplateRef } from 'vue'
import { IftaLabel, InputText, Popover } from 'primevue'

const modelValue = defineModel<ITagEntity[]>({ type: Array, default: () => [] })
const selectedTagIds = computed(() => new Set(modelValue.value.map((tag) => tag.id)))

const inputId = useId()
const containerRef = useTemplateRef('container')
const popoverRef = useTemplateRef('popover')
const newTagColor = ref('#002eff')
const { searchTerm, data: searchResults } = useTagsSearchQuery(20)

function showPopover(event: Event) {
    if (popoverRef.value) {
        popoverRef.value.show(event)
    }
}

function hidePopover() {
    if (popoverRef.value) {
        popoverRef.value.hide()
    }
}

function handleClickAddTag(tag: ITagEntity) {
    if (selectedTagIds.value.has(tag.id)) {
        hidePopover()
        return
    }

    modelValue.value = [...modelValue.value, tag]
    hidePopover()
}

function handleClickDeleteTag(tag: ITagEntity) {
    modelValue.value = modelValue.value.filter((t) => t.id !== tag.id)
}

onClickOutside(containerRef, hidePopover, { ignore: ['.vc-colorpicker--container'] })
</script>

<template>
    <div class="flex flex-col" v-bind="$attrs">
        <IftaLabel>
            <label :for="inputId">Label</label>
            <InputText
                v-model.lazy.trim="searchTerm"
                autocomplete="off"
                class="w-full"
                :id="inputId"
                @input="showPopover"
                @focus="showPopover"
            />
        </IftaLabel>

        <TagsChipList class="mt-2" :tags="modelValue" show-close-icon @item:close="handleClickDeleteTag" />
    </div>

    <Popover ref="popover" class="w-lg" :dismissable="false">
        <div class="flex flex-col gap-2" ref="container">
            <CreateNewTag v-if="searchTerm.length" :name="searchTerm" v-model:color="newTagColor" />

            <TagsChipList
                :tags="searchResults"
                class="flex-wrap"
                item-class="cursor-pointer"
                @item:click="handleClickAddTag"
            />
        </div>
    </Popover>
</template>

<style scoped></style>
