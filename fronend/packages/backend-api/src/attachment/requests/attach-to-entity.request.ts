import { apiClient } from '../../api.client.ts'
import type { IAttachment } from '@zoho-ide/shared/entities/attachment'

export function attachToEntityRequest(
    entityId: string,
    entityType: string,
    file: File,
    role = 'attachment'
): Promise<IAttachment> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('role', role)

    return apiClient
        .post(`attachments/${entityType}/${entityId}/attach`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => response.data)
}
