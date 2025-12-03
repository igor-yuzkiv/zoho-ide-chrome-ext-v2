<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ArticleView, useKnowledgeBaseItemDetailsQuery } from '@zoho-ide/knowledge-base'

const itemId = useRouteParams<string>('itemId')
const { data } = useKnowledgeBaseItemDetailsQuery(itemId)
</script>

<template>
    <ArticleView v-if="data" :article="data" />
</template>

<style scoped></style>
