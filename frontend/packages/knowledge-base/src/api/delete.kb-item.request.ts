import { DeleteKbItemByIdResponse } from '../types'
import { apiClient } from '@zoho-ide/shared/api'

export function deleteKbItemRequest(itemId: string): Promise<DeleteKbItemByIdResponse> {
    return apiClient.delete(`knowledge-base/items/${itemId}`).then((r) => r.data)
}
