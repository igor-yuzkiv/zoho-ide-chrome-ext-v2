<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ArticleReadView, useKbItemDetailsQuery } from '@zoho-ide/knowledge-base'

const itemId = useRouteParams<string>('itemId')
const { data } = useKbItemDetailsQuery(itemId)
</script>

<template>
    <ArticleReadView v-if="data" :article="data" />
</template>

<style scoped></style>
