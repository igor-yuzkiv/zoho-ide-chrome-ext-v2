<script setup lang="ts">
import { ExecuteFunctionDialog, useFunctionDetails, useFunctionExecute } from '@/capabilities/function'
import { useRouteParams } from '@vueuse/router'
import { useCreateCodeSnippet } from '@zoho-ide/knowledge-base'
import { NoDataMessage, PageHeader, useToast } from '@zoho-ide/shared'
import { useConfirm } from '@zoho-ide/shared'
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
import { Icon } from '@iconify/vue'
import { AppRouteName } from '@/app/router/app-routes.ts'
import { useCurrentProvider } from '@/entities/provider/composables/useCurrentProvider.ts'
import { useViewMode, ViewModeSelect } from '@/widgets/view-mode'

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()
const providerId = useRouteParams<string>('providerId')
const functionId = useRouteParams<string>('functionId')
const { script, data } = useFunctionDetails(providerId, functionId)
const { create: createCodeSnippet, isCanCreate: isCodeSnippetCanCreated } = useCreateCodeSnippet()
const { data: currentProvider } = useCurrentProvider()

const {
    isCanExecute,
    isExecuting: isFunctionExecuting,
    executionResult,
    argsFormData,
    isVisible: isVisibleExecuteDialog,
    executeFunction,
} = useFunctionExecute(currentProvider, data)

const viewMode = useViewMode(
    [
        {
            value: 'code',
            icon: 'mdi:code',
            component: defineAsyncComponent(
                () => import('../../../capabilities/function/components/detail-view/FunctionCodeView.vue')
            ),
        },
        {
            value: 'json',
            icon: 'si:json-duotone',
            component: defineAsyncComponent(
                () => import('../../../capabilities/function/components/detail-view/FunctionJsonView.vue')
            ),
        },
    ],
    'code'
)

async function handleCreateCodeSnippet() {
    if (!isCodeSnippetCanCreated.value || !data.value || !script.value || isFunctionExecuting.value) {
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

async function handleExecuteFunction() {
    if (!data.value) {
        return
    }

    confirm.require({
        header: 'Execute Function',
        message: `Are you sure you want to execute the function: ${data.value.displayName}?`,
        acceptLabel: 'Execute',
        accept: () => {
            executeFunction()
                .then((result) => {
                    if (!result.ok) {
                        toast.error({
                            summary: 'Execute Function',
                            detail: result.error || 'Failed to execute the function. Please try again.',
                        })
                    }
                })
                .catch((error) => {
                    console.error('Error executing function:', error)
                    toast.error({
                        summary: 'Execute Function',
                        detail: 'Unexpected error occurred while executing the function. Please try again.',
                    })
                })
        },
    })
}
</script>

<template>
    <div v-if="data" class="flex h-full w-full flex-col overflow-hidden gap-1">
        <PageHeader :title="data.displayName">
            <template #description>
                <div class="text-gray-500 text-xs">
                    <b class="capitalize">{{ data.type }}: </b>
                    <span v-if="data?.apiName">{{ data.apiName }}</span>
                    <i v-else> No API Name </i>
                </div>
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

                <Button size="small" text v-if="isCanExecute" @click="isVisibleExecuteDialog = true">
                    <Icon icon="grommet-icons:trigger" />
                    Execute (Beta)
                </Button>

                <ViewModeSelect :options="viewMode.options" v-model="viewMode.current.value" />
            </template>
        </PageHeader>

        <div class="flex h-full w-full flex-col overflow-auto app-card">
            <component :is="viewMode.currentComponent.value" v-model:script="script" :fx="data" />
        </div>
    </div>

    <NoDataMessage
        v-else
        class="h-full w-full app-card"
        title="Function Not Selected"
        message="Please select a function to view its details."
    />

    <ExecuteFunctionDialog
        v-model:visible="isVisibleExecuteDialog"
        v-model:args="argsFormData"
        :params="data?.params || []"
        :function-name="data?.displayName"
        :result="executionResult"
        @execute="handleExecuteFunction"
        :loading="isFunctionExecuting"
    />
</template>

<style scoped></style>
