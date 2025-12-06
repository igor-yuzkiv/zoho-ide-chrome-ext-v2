import type { IKnowledgeBaseTemplate } from '../types'
import { apiClient } from '@zoho-ide/shared'

export async function fetchKbTemplatesRequest(): Promise<IKnowledgeBaseTemplate[]> {
    return apiClient
        .get<{ data: IKnowledgeBaseTemplate[] }>(`/knowledge-base/templates`)
        .then((response) => response.data.data)
}
