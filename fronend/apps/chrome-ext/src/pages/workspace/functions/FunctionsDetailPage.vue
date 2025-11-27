<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { CodeEditor } from '@/shared/components/code-editor'
import { NoDataMessage } from '@zoho-ide/ui-kit/components'
import { useFunctionDetails } from '@/capabilities/function'

const providerId = useRouteParams<string>('providerId')
const functionId = useRouteParams<string>('functionId')
const functionDetails = useFunctionDetails(providerId, functionId)
</script>

<template>
    <div v-if="functionId" class="flex h-full w-full flex-col overflow-hidden app-card">
        <CodeEditor v-model="functionDetails.script.value" />
    </div>

    <NoDataMessage
        v-else
        class="h-full w-full app-card"
        title="Function Not Selected"
        message="Please select a function to view its details."
    />
</template>

<style scoped></style>
