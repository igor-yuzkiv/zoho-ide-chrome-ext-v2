import { MaybeRefOrGetter } from '@vueuse/core'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import { IFunctionRecordEntity } from '@zoho-ide/shared'
import { Maybe, Result } from '@zoho-ide/shared'
import { ServiceProvider } from '@zoho-ide/shared'
import { computed, ref, toValue } from 'vue'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'

export function useFunctionExecute(
    provider: MaybeRefOrGetter<Maybe<ServiceProvider>>,
    fx: MaybeRefOrGetter<Maybe<IFunctionRecordEntity>>
) {
    const isVisible = ref(false)
    const isExecuting = ref(false)
    const argsFormData = ref<Record<string, unknown>>({})
    const executionResult = ref<string>('')
    const { resolvePort } = useCapabilitiesConfig()

    const isCanExecute = computed(() => {
        const providerValue = toValue(provider)
        const fxValue = toValue(fx)

        return providerValue && providerValue?.tabId && fxValue && !!fxValue.script
    })

    async function executeFunction(): Promise<Result<string>> {
        const providerValue = toValue(provider)
        const fxValue = toValue(fx)
        if (!providerValue?.tabId || !fxValue?.script) {
            return { ok: false, error: 'Function or provider is not valid' }
        }

        const port = resolvePort(providerValue, ProviderCapabilityType.FUNCTIONS)
        if (!port || !port.execute) {
            return {
                ok: false,
                error: 'Unable to execute function. Current provider does not support function execution.',
            }
        }

        isExecuting.value = true
        const result = await port.execute(fxValue, argsFormData.value).finally(() => (isExecuting.value = false))
        if (!result.ok) {
            return result
        }

        executionResult.value = JSON.stringify(result, null, 2)

        return { ok: true, value: executionResult.value }
    }

    return {
        isVisible,
        isExecuting,
        isCanExecute,
        argsFormData,
        executionResult,
        executeFunction,
    }
}
