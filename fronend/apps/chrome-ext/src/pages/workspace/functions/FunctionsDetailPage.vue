<script setup lang="ts">
import { useFunctionDetails } from '@/capabilities/function'
import { CapabilityType } from '@/config/capabilities.config.ts'
import { useRouteParams } from '@vueuse/router'
import { useCreateCodeSnippet } from '@zoho-ide/knowledge-base'
import { NoDataMessage, PageHeader, useAppThemeStore, useToast } from '@zoho-ide/shared'
import { useConfirm } from '@zoho-ide/shared'
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()
const appTheme = useAppThemeStore()
const providerId = useRouteParams<string>('providerId')
const functionId = useRouteParams<string>('functionId')
const { script, data } = useFunctionDetails(providerId, functionId)
const { create: createCodeSnippet, isCanCreate: isCodeSnippetCanCreated } = useCreateCodeSnippet()

const { isOnline, resolvePort } = useCurrentProvider()

async function handleCreateCodeSnippet() {
    if (!isCodeSnippetCanCreated.value || !data.value || !script.value) {
        return
    }

    confirm.require({
        header: 'Create Knowledge Base Item',
        message: `Are you sure you want to create a code snippet from function: ${data.value.displayName}?`,
        accept: () => {
            createCodeSnippet(`Code sample from function: ${data.value.displayName}`, script.value).then((response) => {
                router.push({ name: AppRouteName.knowledgeBaseArticleEdit, params: { itemId: response.id } })
            })
        },
    })
}

async function executeFunction() {
    if (!data.value) {
        return
    }

    const functionsPort = resolvePort(CapabilityType.FUNCTIONS)
    if (!functionsPort || !functionsPort?.execute) {
        toast.warn({
            summary: 'Execute Function',
            detail: 'Current provider does not support function execution.',
        })
        return
    }

    const isConfirmed = await confirm.requireAsync({
        header: 'Execute Function',
        message: `Are you sure you want to execute the function: ${data.value.displayName}?`,
        acceptLabel: 'Execute',
    })

    if (!isConfirmed) {
        return
    }

    try {
        const result = await functionsPort.execute(data.value, {})
        if (!result.ok) {
            toast.error({
                summary: 'Execute Function',
                detail: result.error || 'Failed to execute the function. Please try again.',
            })
            return
        }

        script.value += `\n\n ==== Execution Result ====\n${JSON.stringify(result, null, 2)}`
    } catch (error) {
        toast.error({
            summary: 'Execute Function',
            detail: 'Unexpected error occurred while executing the function. Please try again.',
        })
        console.error('Error executing function:', error)
    }
}
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

            <template #actions>
                <Button
                    v-if="isCodeSnippetCanCreated && script"
                    @click="handleCreateCodeSnippet"
                    size="small"
                    text
                    severity="secondary"
                >
                    <Icon icon="octicon:file-code-24" />
                    Create Snippet
                </Button>

                <Button size="small" text v-if="isOnline" @click="executeFunction">
                    <Icon icon="grommet-icons:trigger" />
                    Execute (Beta)
                </Button>
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
