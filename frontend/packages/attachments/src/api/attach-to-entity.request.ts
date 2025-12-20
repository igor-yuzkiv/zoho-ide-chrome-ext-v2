import type { IAttachment } from '../types'
import { apiClient } from '@zoho-ide/shared'

export function attachToEntityRequest(
    entityType: string,
    entityId: string,
    file: File,
    role = 'attachment'
): Promise<IAttachment> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('role', role)

    return apiClient
        .post<{ data: IAttachment }>(`attachments/${entityType}/${entityId}/attach`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => response.data.data)
}
