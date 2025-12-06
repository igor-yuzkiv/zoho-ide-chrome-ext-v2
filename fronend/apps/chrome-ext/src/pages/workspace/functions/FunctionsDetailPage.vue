<script setup lang="ts">
import { useFunctionDetails } from '@/capabilities/function'
import { useRouteParams } from '@vueuse/router'
import { NoDataMessage, PageHeader, useAppThemeStore } from '@zoho-ide/shared'

const appTheme = useAppThemeStore()
const providerId = useRouteParams<string>('providerId')
const functionId = useRouteParams<string>('functionId')
const { script, data } = useFunctionDetails(providerId, functionId)
</script>

<template>
    <div v-if="data" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="data.displayName">
            <template #description>
                <p class="text-gray-500 text-xs">
                    <b class="capitalize">{{ data.type }}: </b>
                    <span v-if="data?.apiName">{{ data.apiName }}</span>
                    <i v-else> No API Name </i>
                </p>
            </template>
        </PageHeader>

        <div class="flex h-full w-full flex-col overflow-auto app-card">
            <vue-monaco-editor
                language="javascript"
                v-model:value="script"
                :theme="appTheme.isDark ? 'vs-dark' : 'vs'"
            />
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
