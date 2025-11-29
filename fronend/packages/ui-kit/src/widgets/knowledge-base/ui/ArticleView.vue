<script setup lang="ts">
import { useAppTheme } from '../../../composables'
import type { IKnowledgeBaseItem } from '@zoho-ide/shared/entities/knowledge-base'
import { MdPreview } from 'md-editor-v3'
import Tag from 'primevue/tag'
import { Icon } from '@iconify/vue'

defineProps<{
    article: IKnowledgeBaseItem
}>()

const { isDark } = useAppTheme()
</script>

<template>
    <div class="flex flex-col w-full h-full app-card overflow-hidden">
        <div class="flex flex-col w-full h-full overflow-auto p-3">
            <MdPreview
                :modelValue="article?.content || '*No description*'"
                :theme="isDark ? 'dark' : 'light'"
                language="en-US"
            />
        </div>

        <div class="flex items-center justify-between dark:bg-secondary/60">
            <div class="flex items-center gap-x-2 px-2">
                <Tag severity="success" class="py-0">Zoho Crm</Tag>
                <Tag class="py-0">Deluge</Tag>
            </div>

            <div class="flex items-center h-full text-gray-400">
                <div
                    class="flex items-center gap-x-2 hover:bg-black/50 dark:hover:bg-primary cursor-pointer px-2 h-full hover:text-white"
                >
                    <Icon icon="clarity:date-line" />
                    <span>2025-11-12</span>
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
