import { apiClient } from '../../api.client.ts'
import type { IAttachment } from '@zoho-ide/shared/entities/attachment'

export function uploadTmpAttachmentRequest(file: File, role = 'tmp'): Promise<IAttachment> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('role', role)

    return apiClient
        .post('attachments/upload/tmp', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => response.data)
}
