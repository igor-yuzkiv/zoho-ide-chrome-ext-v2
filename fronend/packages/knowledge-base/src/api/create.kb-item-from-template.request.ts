import type { CreateKbItemFromTemplateRequestPayload, IKnowledgeBaseItem } from '../types'
import { apiClient } from '@zoho-ide/shared'

export function createKbItemFromTemplateRequest(
    templateId: string,
    payload: CreateKbItemFromTemplateRequestPayload
): Promise<IKnowledgeBaseItem> {
    return apiClient
        .post<{ data: IKnowledgeBaseItem }>(`knowledge-base/items/templates/${templateId}`, payload)
        .then((r) => r.data.data)
}
