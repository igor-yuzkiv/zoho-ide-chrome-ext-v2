import type { IAttachment } from '../types'
import { apiClient } from '@zoho-ide/shared'

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
