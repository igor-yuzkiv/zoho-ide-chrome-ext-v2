<script setup lang="ts">
import { useFunctionDetails } from '@/capabilities/function'
import { useRouteParams } from '@vueuse/router'
import { NoDataMessage, PageHeader } from '@zoho-ide/shared'
import { CodeEditor } from '@/shared/components/code-editor'

const providerId = useRouteParams<string>('providerId')
const functionId = useRouteParams<string>('functionId')
const { script, data } = useFunctionDetails(providerId, functionId)
</script>

<template>
    <div v-if="data" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="data.displayName" />

        <div class="flex h-full w-full flex-col overflow-auto app-card">
            <CodeEditor v-model="script" />
        </div>
    </div>

    <NoDataMessage
        v-else
        class="h-full w-full app-card"
        title="Function Not Selected"
        message="Please select a function to view its details."
    />
</template>

<style scoped></style>
