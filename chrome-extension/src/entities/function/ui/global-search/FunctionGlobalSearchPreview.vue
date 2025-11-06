<script setup lang="ts">
import type { GlobalSearchDocument } from '@/shared/libs/global-search/lib/global-search.types.ts'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

defineProps<{
    document: GlobalSearchDocument
    searchOptions?: { query: string; field: string }
}>()

function onElementMounted(element) {
    if (element) {
        Prism.highlightElement(element)
    }
}

</script>

<template>
    <div class="flex w-full h-full">
        <pre class="w-full"><code :ref="onElementMounted" class="language-js">{{ document.content }}</code></pre>
    </div>
</template>

<style scoped></style>
