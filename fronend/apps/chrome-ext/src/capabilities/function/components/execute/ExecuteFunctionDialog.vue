<script setup lang="ts">
import { FunctionParams } from '@/capabilities/function/function.types.ts'
import { FieldContainer } from '@zoho-ide/shared'
// @ts-expect-error: no types
import Prism from 'prismjs'
import { onMounted, useTemplateRef } from 'vue'
import { Button, Dialog, InputText } from 'primevue'

withDefaults(
    defineProps<{
        functionName?: string
        params: FunctionParams[]
        result?: string
    }>(),
    {
        result: '',
    }
)

defineEmits<{
    (event: 'execute', args: Record<string, unknown>): void
}>()
const codeRef = useTemplateRef('code-element')
const visible = defineModel<boolean>('visible', { default: false })
const args = defineModel<Record<string, unknown>>('args', { default: () => ({}) })

function handleInputChange(paramName: string, value: unknown) {
    args.value = {
        ...args.value,
        [paramName]: value,
    }
}

onMounted(() => {
    if (codeRef.value) {
        Prism.highlightElement(codeRef.value)
    }
})
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :draggable="false"
        :header="functionName ? `Execute Function: ${functionName}` : 'Execute Function'"
        content-class="flex flex-col w-full h-full gap-2 overflow-hidden"
        :closable="false"
        class="w-1/3 h-2/3"
    >
        <div v-if="params.length" class="grid grid-cols-2 gap-2 w-full">
            <FieldContainer
                v-for="param in params"
                :key="param.name"
                :label="`${param.name} (${param.type})`"
                :input-id="`arg-${param.name}`"
            >
                <InputText
                    class="w-full"
                    :model-value="args[param.name] as string"
                    @update:model-value="handleInputChange(param.name, $event)"
                />
            </FieldContainer>
        </div>

        <div class="flex flex-col w-full h-full overflow-auto app-card p-1">
            <pre class="w-full"><code ref="code-element" class="language-json">{{ result }}</code></pre>
        </div>

        <template #footer>
            <div class="flex justify-between gap-2 w-full">
                <Button label="Cancel" severity="secondary" @click="visible = false" size="small" />
                <Button label="Execute" severity="primary" size="small" @click="$emit('execute', args)" />
            </div>
        </template>
    </Dialog>
</template>

<style scoped></style>
