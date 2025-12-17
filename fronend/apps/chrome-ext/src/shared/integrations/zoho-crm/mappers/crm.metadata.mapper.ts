import type { IModuleFieldMetadataRecordEntity, IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import type { CrmModuleField, CrmModuleMetadata } from '@/shared/integrations/zoho-crm/types/crm.metadata.types.ts'

export function mapCrmModuleToEntity(module: CrmModuleMetadata): IModuleMetadataRecordEntity<CrmModuleMetadata> {
    return {
        id: module.id,
        apiName: module.api_name,
        displayName: module.singular_label,
        originEntity: module,
    }
}

export function mapManyCrmModulesToEntities(
    modules: CrmModuleMetadata[]
): IModuleMetadataRecordEntity<CrmModuleMetadata>[] {
    return modules.map(mapCrmModuleToEntity)
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
    field: CrmModuleField,
    crmModule: CrmModuleMetadata
): IModuleFieldMetadataRecordEntity<CrmModuleField> {
    return {
        id: `${crmModule.api_name}-${field.id}`,
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
    fields: CrmModuleField[],
    crmModule: CrmModuleMetadata
): IModuleFieldMetadataRecordEntity<CrmModuleField>[] {
    return fields.map((field) => mapCrmFieldToEntity(field, crmModule))
}
