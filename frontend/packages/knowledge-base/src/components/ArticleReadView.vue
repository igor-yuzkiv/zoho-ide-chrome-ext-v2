<script setup lang="ts">
import type { IKnowledgeBaseItemDetails } from '../types'
import { TagsChipList } from '@zoho-ide/tags'
import { format } from 'date-fns'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { MarkdownPreview } from '@zoho-ide/ui-kit'

const props = defineProps<{ article: IKnowledgeBaseItemDetails }>()

const createdAt = computed(() => {
    return props.article?.created_at ? format(props.article.created_at, 'yyyy-MM-dd') : ''
})
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full app-card">
        <div class="flex flex-col w-full p-3">
            <div class="flex items-center justify-between w-full">
                <h1 class="text-3xl font-bold">{{ article.title }}</h1>
                <div class="flex items-center gap-x-2">
                    <slot name="header-actions" />
                </div>
            </div>

            <div class="flex items-center">
                <TagsChipList v-if="article?.tags?.length" :tags="article.tags" inline item-class="py-0" />
            </div>
        </div>

        <div class="flex flex-col w-full h-full overflow-auto px-2">
            <MarkdownPreview :content="article.content" />
        </div>

        <div class="flex items-center justify-end bg-secondary/60 overflow-hidden">
            <div class="flex items-center h-full text-gray-600 dark:text-gray-300 truncate shrink-0">
                <div
                    v-if="article.created_by_user"
                    class="flex items-center gap-x-2 hover:bg-black/50 dark:hover:bg-primary cursor-pointer px-2 h-full hover:text-white"
                >
                    <Icon icon="mdi:user" />
                    <span>{{ article.created_by_user.name }}</span>
                </div>
                <div
                    v-if="createdAt"
                    class="flex items-center gap-x-2 hover:bg-black/50 dark:hover:bg-primary cursor-pointer px-2 h-full hover:text-white"
                >
                    <Icon icon="clarity:date-line" />
                    <span>{{ createdAt }}</span>
                </div>
                <!--<div
                    class="flex items-center gap-x-2 hover:bg-black/50 dark:hover:bg-primary cursor-pointer px-2 h-full hover:text-white"
                >
                    <Icon icon="tabler:eye" />
                    <span>32</span>
                </div>
                <div
                    class="flex items-center gap-x-2 hover:bg-black/50 dark:hover:bg-primary cursor-pointer px-2 h-full hover:text-white"
                >
                    <Icon icon="icon-park-solid:like" />
                    <span>32</span>
                </div>-->
            </div>
        </div>
    </div>
</template>

<style scoped></style>
