import  { type MaybeRefOrGetter, toValue } from 'vue'
import { attachToEntityRequest } from '@zoho-ide/backend-api/attachment'

export function useAttachToEntityMutation(entityType: MaybeRefOrGetter<string>, entityId: MaybeRefOrGetter<string>, role: MaybeRefOrGetter<string> = 'attachment') {

    async function upload(file: File) {
        const response = await attachToEntityRequest(
            toValue(entityId),
            toValue(entityType),
            file,
            toValue(role)
        )

        console.log('Attachment uploaded:', response)
    }

    return {
        entityType,
        entityId,
        role,
        upload,
    }
}
