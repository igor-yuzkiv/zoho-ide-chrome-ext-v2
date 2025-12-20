import type { IModuleFieldMetadataRecordEntity, IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import { ProviderCapabilityType } from '@zoho-ide/shared'
import type { CrmModuleField, CrmModuleMetadata } from '@/shared/integrations/zoho-crm/types/crm.metadata.types.ts'

export function mapCrmModuleToEntity(
    providerId: string,
    module: CrmModuleMetadata
): IModuleMetadataRecordEntity<CrmModuleMetadata> {
    return {
        id: module.id,
        sourceId: module.id,
        providerId,
        capabilityType: ProviderCapabilityType.MODULES,
        apiName: module.api_name,
        displayName: module.singular_label,
        originEntity: module,
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
        id: `${crmModule.api_name}-${field.id}`,
        sourceId: field.id,
        providerId,
        capabilityType: ProviderCapabilityType.FIELDS,
        apiName: field.api_name,
        moduleApiName: crmModule.api_name,
        moduleId: crmModule.id,
        displayName: field.field_label,
        dataType: field.data_type,
        displayDataType: formatDisplayDataType(field),
        originEntity: field,
    }
}

export function mapManyCrmFieldsToEntities(
    providerId: string,
    fields: CrmModuleField[],
    crmModule: CrmModuleMetadata
): IModuleFieldMetadataRecordEntity<CrmModuleField>[] {
    return fields.map((field) => mapCrmFieldToEntity(providerId, field, crmModule))
}
