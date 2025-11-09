<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { CodeEditor } from '@/shared/components/code-editor'
import { NoDataMessage } from '@/shared/components/messages'
import { useFunctionDetails } from '@/features/functions/details'

const providerId = useRouteParams<string>('providerId')
const functionId = useRouteParams<string>('functionId')
const functionDetails = useFunctionDetails(providerId, functionId)
</script>

<template>
    <div v-if="functionId" class="flex h-full w-full flex-col overflow-hidden bg-primary rounded-lg">
        <CodeEditor v-model="functionDetails.script.value" />
    </div>

    <NoDataMessage
        v-else
        class="h-full w-full bg-primary rounded-lg"
        title="Function Not Selected"
        message="Please select a function to view its details."
    />
</template>

<style scoped></style>
