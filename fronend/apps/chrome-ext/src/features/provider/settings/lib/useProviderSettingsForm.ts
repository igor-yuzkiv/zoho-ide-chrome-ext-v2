import { ProviderSettingForm } from './types.ts'
import { PROVIDER_CACHE_TTL_MS } from '@/config/providers.config.ts'
import { useToast } from '@zoho-ide/shared'
import * as z from 'zod'
import { ref, watch } from 'vue'
import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import { useCapabilitiesCacheManager } from '@/entities/capability/composables/useCapabilitiesCacheManager.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'

const MIN_CACHE_TTL_MS = 60 * 1000 // 1 minute
const MAX_CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

const ProviderSettingFormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be at most 100 characters'),
    cacheTtlMs: z
        .number()
        .int('Cache TTL must be an integer')
        .min(MIN_CACHE_TTL_MS, `Cache TTL must be at least 1 minute (${MIN_CACHE_TTL_MS} ms)`)
        .max(MAX_CACHE_TTL_MS, `Cache TTL must be at most 24 hours (${MAX_CACHE_TTL_MS} ms)`),
})

export const getDefaultFormData = (): ProviderSettingForm => ({
    title: '',
    cacheTtlMs: PROVIDER_CACHE_TTL_MS,
})

export function useProviderSettingsForm() {
    const visible = ref(false)
    const currentProviderId = ref<string | null>(null)
    const formData = ref<ProviderSettingForm>(getDefaultFormData())
    const providersStore = useProvidersStore()
    const logger = useLogger('useProviderSettingsForm')
    const cacheManager = useCapabilitiesCacheManager()
    const toast = useToast()
    const formErrors = ref<Record<string, string[]>>({})

    function openForm(providerId: string) {
        const provider = providersStore.findProviderById(providerId)
        if (!provider) {
            logger.warn(`Provider with ID ${providerId} not found.`)
            return
        }

        formData.value = {
            title: provider.title || '',
            cacheTtlMs: provider.cacheTtlMs || PROVIDER_CACHE_TTL_MS,
        }
        currentProviderId.value = providerId
        visible.value = true
    }

    function closeForm() {
        visible.value = false
        currentProviderId.value = null
        formData.value = getDefaultFormData()
    }

    function validateFormData(data: ProviderSettingForm) {
        formErrors.value = {}

        try {
            ProviderSettingFormSchema.parse(data)
            return true
        } catch (e) {
            if (e instanceof z.ZodError) {
                formErrors.value = Object.fromEntries(
                    e.issues.map((issue) => [issue.path[0] as string, [issue.message]])
                )
            } else {
                toast.error({ detail: 'An unexpected error occurred during form validation.' })
            }

            return false
        }
    }

    function submitForm() {
        if (!currentProviderId.value) {
            logger.warn('No provider ID set for form submission.')
            return
        }

        const isValid = validateFormData(formData.value)
        if (isValid) {
            providersStore.updateProvider(currentProviderId.value, formData.value)
            cacheManager.invalidateProviderQueries(currentProviderId.value)
            visible.value = false
        }
    }

    watch(visible, (newVal) => {
        if (!newVal) {
            closeForm()
        }
    })

    return {
        visible,
        formData,
        openForm,
        closeForm,
        submitForm,
        formErrors,
    }
}
