<script setup lang="ts">
import type { IKnowledgeBaseItemDetails } from '../types'
import { useAppThemeStore } from '@zoho-ide/shared'
import { TagsChipList } from '@zoho-ide/tags'
import { format } from 'date-fns'
import { MdPreview } from 'md-editor-v3'
import { config as mdEditorConfig } from 'md-editor-v3'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

mdEditorConfig({
    katexConfig(base: any) {
        return {
            ...base,
            strict: false, // Disable strict mode to allow all cyrylic characters
        }
    },
})

const props = defineProps<{ article: IKnowledgeBaseItemDetails }>()
const appTheme = useAppThemeStore()

const createdAt = computed(() => {
    return props.article?.created_at ? format(props.article.created_at, 'yyyy-MM-dd') : ''
})
</script>

<template>
    <div class="flex flex-col w-full h-full app-card overflow-hidden">
        <div class="flex flex-col w-full h-full overflow-auto p-3">
            <MdPreview
                :modelValue="article?.content || '*No description*'"
                :theme="appTheme.isDark ? 'dark' : 'light'"
                language="en-US"
            />
        </div>

        <div class="flex items-center justify-between bg-secondary/60 overflow-hidden px-1">
            <div class="flex overflow-hidden">
                <TagsChipList v-if="article?.tags?.length" :tags="article.tags" inline item-class="py-0" />
            </div>

            <div class="flex items-center h-full text-gray-400 truncate shrink-0">
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
                <div
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
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
