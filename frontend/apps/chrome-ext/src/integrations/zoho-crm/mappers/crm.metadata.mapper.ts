import type { CrmModuleField, CrmModuleMetadata } from '@/integrations/zoho-crm/types/crm.metadata.types.ts'
import {
    type IModuleFieldMetadataRecordEntity,
    type IModuleMetadataRecordEntity,
    makeProviderCapabilityId,
    ProviderCapabilityType,
} from '@zoho-ide/shared'

export function mapCrmModuleToEntity(
    providerId: string,
    module: CrmModuleMetadata
): IModuleMetadataRecordEntity<CrmModuleMetadata> {
    return {
        id: makeProviderCapabilityId(providerId, ProviderCapabilityType.MODULES, module.api_name),
        source_id: module.id,
        provider_id: providerId,
        capability_type: ProviderCapabilityType.MODULES,
        api_name: module.api_name,
        display_name: module.singular_label,
        origin_entity: module,
    }
}

export function mapManyCrmModulesToEntities(
    providerId: string,
    modules: CrmModuleMetadata[]
): IModuleMetadataRecordEntity<CrmModuleMetadata>[] {
    return modules.map((i) => mapCrmModuleToEntity(providerId, i))
}

function formatDisplayDataType(field: CrmModuleField): string {
    const formatters = {
        multiselectlookup: (field: CrmModuleField) => {
            const module = field?.multiselectlookup?.connected_module?.api_name
            return module ? `multiselectlookup<${module}>` : 'multiselectlookup<unknown>'
        },
        lookup: (field: CrmModuleField) => {
            const module = field?.lookup?.module?.api_name
            return module ? `lookup<${module}>` : 'lookup<unknown>'
        },
    }

    if (field.data_type in formatters) {
        return formatters[field.data_type as keyof typeof formatters](field)
    }

    return field.data_type
}

export function mapCrmFieldToEntity(
    providerId: string,
    field: CrmModuleField,
    crmModule: CrmModuleMetadata
): IModuleFieldMetadataRecordEntity<CrmModuleField> {
    return {
        id: makeProviderCapabilityId(providerId, ProviderCapabilityType.FIELDS, [crmModule.api_name, field.api_name]),
        parent_id: makeProviderCapabilityId(providerId, ProviderCapabilityType.MODULES, crmModule.api_name),
        source_id: field.id,
        provider_id: providerId,
        capability_type: ProviderCapabilityType.FIELDS,
        api_name: field.api_name,
        module_api_name: crmModule.api_name,
        module_id: crmModule.id,
        display_name: field.field_label,
        data_type: field.data_type,
        display_data_type: formatDisplayDataType(field),
        origin_entity: field,
    }
}

export function mapManyCrmFieldsToEntities(
    providerId: string,
    fields: CrmModuleField[],
    crmModule: CrmModuleMetadata
): IModuleFieldMetadataRecordEntity<CrmModuleField>[] {
    return fields.map((field) => mapCrmFieldToEntity(providerId, field, crmModule))
}
