<script setup lang="ts">
import { useCreateTagMutation } from '../../mutations/useCreateTagMutation.ts'
import { useTagsSearchQuery } from '../../queries'
import { ITagEntity } from '../../types'
import TagChip from '../chip/TagChip.vue'
import TagsChipList from '../chip/TagsChipList.vue'
import { onClickOutside } from '@vueuse/core'
import { HexColorPicker } from '@zoho-ide/shared'
import { computed, ref, useId, useTemplateRef } from 'vue'
import { Button, IftaLabel, InputText, Popover } from 'primevue'

const modelValue = defineModel<ITagEntity[]>({ type: Array, default: () => [] })
const selectedTagIds = computed(() => new Set(modelValue.value.map((tag) => tag.id)))

const inputId = useId()
const containerRef = useTemplateRef('container')
const popoverRef = useTemplateRef('popover')

const { searchTerm, data: searchResults } = useTagsSearchQuery(20)
const tagsForAdd = computed(() => searchResults.value.filter((tag) => !selectedTagIds.value.has(tag.id)))

const newTagColor = ref('#002eff')
const isNewTagCanBeCreated = computed(() => {
    if (!searchTerm.value.length) {
        return false
    }

    return !searchResults.value.some((tag) => tag.name.toLowerCase() === searchTerm.value.toLowerCase())
})

const { mutateAsync: submitNewTag, isPending: isNewTagCreating } = useCreateTagMutation()

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

function handleClickCreateTag() {
    if (!isNewTagCanBeCreated.value || isNewTagCreating.value) {
        return
    }

    submitNewTag({ name: searchTerm.value, color: newTagColor.value }).then((response) => {
        if (response) {
            handleClickAddTag(response)
            searchTerm.value = ''
        }
    })
}

onClickOutside(containerRef, hidePopover, { ignore: ['.vc-colorpicker--container', `#${inputId}`] })
</script>

<template>
    <div class="flex flex-col" v-bind="$attrs">
        <IftaLabel>
            <label :for="inputId">Tags</label>
            <InputText
                v-model.lazy.trim="searchTerm"
                autocomplete="off"
                class="w-full"
                :id="inputId"
                @input="showPopover"
                @focus="showPopover"
                placeholder="Start typing to search tags..."
            />
        </IftaLabel>

        <TagsChipList class="mt-2" :tags="modelValue" show-close-icon @item:close="handleClickDeleteTag" />
    </div>

    <Popover ref="popover" class="w-lg" :dismissable="false">
        <div class="flex flex-col gap-2" ref="container">
            <div v-if="isNewTagCanBeCreated" class="flex items-center justify-between">
                <TagChip :name="searchTerm" :color="newTagColor" />

                <div class="flex items-center gap-x-2">
                    <Button text @click="handleClickCreateTag" :disabled="isNewTagCreating">Create</Button>
                    <HexColorPicker v-model="newTagColor" />
                </div>
            </div>

            <TagsChipList
                :tags="tagsForAdd"
                class="flex-wrap"
                item-class="cursor-pointer"
                @item:click="handleClickAddTag"
            />
        </div>
    </Popover>
</template>

<style scoped></style>
