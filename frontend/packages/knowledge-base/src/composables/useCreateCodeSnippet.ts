import { useCreateKbItemFromTemplate } from '../mutations'
import { useKbTemplatesListQuery } from '../queries'
import type { IKnowledgeBaseItem } from '../types'
import { useToast } from '@zoho-ide/shared'
import { computed } from 'vue'

export function useCreateCodeSnippet() {
    const toast = useToast()
    const { data: templates, isFetching: isFetchingTemplates } = useKbTemplatesListQuery()

    const template = computed(() => {
        return templates.value?.find((t) => t?.category === 'code_samples')
    })

    const { mutateAsync, isPending } = useCreateKbItemFromTemplate({
        onError: (displayMessage) => toast.error({ detail: displayMessage }),
    })

    const isLoading = computed(() => isFetchingTemplates.value || isPending.value)
    const isCanCreate = computed(() => !!template.value)

    async function create(name: string, content?: string): Promise<IKnowledgeBaseItem> {
        if (!template.value) {
            throw new Error('Code snippet template not found')
        }

        return await mutateAsync({
            templateId: template.value.id,
            payload: {
                title: name,
                attributes: { code: content || '' },
            },
        })
    }

    return {
        isLoading,
        isCanCreate,
        create,
    }
}
