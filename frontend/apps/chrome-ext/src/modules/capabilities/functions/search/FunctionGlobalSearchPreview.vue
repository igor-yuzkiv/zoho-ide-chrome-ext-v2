<script setup lang="ts">
// @ts-expect-error: no types
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import { onMounted, useTemplateRef } from 'vue'
import type { GlobalSearchDocument } from '@/modules/global-search/global-search.types.ts'

defineProps<{
    document: GlobalSearchDocument
    searchOptions?: { query: string; field: string }
}>()

const codeRef = useTemplateRef('code-element')

onMounted(() => {
    if (codeRef.value) {
        Prism.highlightElement(codeRef.value)
    }
})
</script>

<template>
    <div class="flex w-full h-full">
        <pre class="w-full"><code ref="code-element" class="language-js">{{ document.content }}</code></pre>
    </div>
</template>

<style scoped></style>
