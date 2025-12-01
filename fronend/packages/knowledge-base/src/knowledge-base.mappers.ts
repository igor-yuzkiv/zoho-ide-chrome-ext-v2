import type { KbItemFormData, SaveKbItemRequestPayload } from './types'

export function mapKbItemFormDataToRequestPayload(data: KbItemFormData): SaveKbItemRequestPayload {
    return {
        title: data.title,
        content: data.content,
        parentId: data?.parentId,
        tags_ids: data.tags?.length ? data.tags.map((tag) => tag.id) : [],
    }
}
