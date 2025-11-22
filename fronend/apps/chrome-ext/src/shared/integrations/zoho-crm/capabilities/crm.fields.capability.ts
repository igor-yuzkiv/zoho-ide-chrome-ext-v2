import type { IModuleFieldMetadataEntity, IModuleMetadataEntity } from '@/capabilities/metadata/metadata.types.ts'
import { CapabilityType } from '@/config/capabilities.config.ts'
import { assertCrmMetadata } from '@/shared/integrations/zoho-crm/crm.utils.ts'
import { mapManyCrmFieldsToEntities } from '@/shared/integrations/zoho-crm/mappers/crm.metadata.mapper.ts'
import fetchCrmModuleFieldsRequest from '@/shared/integrations/zoho-crm/requests/fetch.crm-module-fields.request.ts'
import type { CrmModuleField, CrmModuleMetadata } from '@/shared/integrations/zoho-crm/types/crm.metadata.types.ts'
import type { PaginatedResult } from '@/shared/types/pagination.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'
import type { CapabilityPort } from '@/entities/capability/capability.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

async function fetchModuleFields(
    tabId: number,
    orgId: string,
    module: CrmModuleMetadata
): Promise<IModuleFieldMetadataEntity<CrmModuleField>[]> {
    return fetchCrmModuleFieldsRequest(tabId, orgId, module.api_name).then((result) => {
        if (!result.ok) {
            console.warn(`Failed to zoho crm fields from ${module.api_name}(orgId: ${orgId})`, {
                error: result.error,
                module,
                orgId,
            })

            return []
        }

        return mapManyCrmFieldsToEntities(result.value, module)
    })
}

export function crmFieldsCapabilityPortFactory(provider: ServiceProvider): Result<CapabilityPort> {
    const metadata = assertCrmMetadata(provider)
    if (!metadata) {
        return { ok: false, error: 'Invalid provider metadata' }
    }

    return {
        ok: true,
        value: {
            async list(): Promise<PaginatedResult<IModuleMetadataEntity[]>> {
                if (!provider.tabId) {
                    return { ok: false, error: 'Provider offline' }
                }

                const modules = await selectProviderRecordsQuery<IModuleMetadataEntity<CrmModuleMetadata>>(
                    provider.id,
                    CapabilityType.MODULES
                ).then((res) => res.filter((m) => m?.originEntity?.api_supported))

                if (!modules.length) {
                    return { ok: false, error: 'No modules for fields fetching' }
                }

                const fields = await Promise.all(
                    modules.map((module) => {
                        if (!provider.tabId) {
                            return Promise.resolve([])
                        }

                        return fetchModuleFields(provider.tabId, metadata.orgId, module.originEntity)
                    })
                ).then((fieldsArrays) => fieldsArrays.flat())

                return {
                    ok: true,
                    value: fields,
                    meta: {
                        count: fields.length,
                        page: 1,
                        perPage: fields.length,
                        hasMore: false,
                    },
                }
            },
        },
    }
}
