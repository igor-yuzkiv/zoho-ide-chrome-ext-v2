# Chrome Extension V2

## Service Provider
`ServiceProvider` — це абстракція, що описує підключення до конкретного інстансу Zoho-сервісу (CRM, Finance тощо) у межах відкритої вкладки браузера.

Відповідає за:
- ідентифікацію сервісу за URL;
- формування унікального `id` та метаданих (`orgId`, sandbox тощо);
- надання стандартного інтерфейсу для подальшої взаємодії з сервісом.

**Key Concepts**

- Кожен Zoho-сервіс має власну фабрику провайдера.
- Провайдер визначає валідність вкладки та формує унікальний id.
- Повертає об’єкт ServiceProvider, який використовується іншими модулями (наприклад, Workspace і Capabilities).

---

**Registration:**

Усі провайдери реєструються в `config/providers.config.ts` через `ProvidersRegister`.

```ts
export const ProvidersRegister: Record<ProviderType, ServiceProviderFactory> = {
    crm: crmServiceProviderFactory,
    finance: financeServiceProviderFactory,
}
```

**Types:** 

```ts
export type ProviderType = 'crm' | 'finance'

export type ServiceProvider = {
    id: string
    type: ProviderType
    title: string
    metadata: Record<string, unknown>
    tabId?: number
    serviceIcon: string
}

export type ServiceProviderFactory = (tab: BrowserTab) => Result<ServiceProvider>
```

**Example:**
```ts
export function crmServiceProviderFactory(tab: BrowserTab): Result<ServiceProvider> {
    if (!tab.url) return { ok: false, error: 'Tab URL is undefined' }

    const metadata = resolveCrmServiceProviderMetadataFromUrl(tab.url)
    if (!metadata) return { ok: false, error: 'Not a valid Zoho CRM URL' }

    return {
        ok: true,
        value: {
            id: `zoho-crm-${metadata.orgId}`,
            type: 'crm',
            title: `Zoho CRM${metadata.isSandbox ? ' Sandbox' : ''} (${metadata.orgId})`,
            metadata,
            tabId: tab.id,
            serviceIcon: 'arcticons:zoho-crm',
        },
    }
}
```

## Capability

**Overview:**

`Capability` — це окрема функціональна можливість або фіча сервісу Zoho (наприклад: *Functions*, *Workflows*, *Modules*, *Fields*).  
Провайдери можуть мати як спільні, так і унікальні capabilities.  
Кожна capability відповідає за доступ до певного типу даних сервісу та взаємодію з ними.

**Key Concepts**

- Кожна capability це порт доступу до певного ресурсу Zoho (модулі, функції, workflows тощо).
- CapabilityPortFactory створює порт (CapabilityPort) на основі активного ServiceProvider.
- Порти реалізують методи для взаємодії з даними (list, get, update тощо).

**Registration:**

Capabilities реєструються у `config/capabilities.config.ts` через `CapabilitiesRegister`.

```ts
export const CapabilitiesRegister: Record<ProviderType, ProviderCapability[]> = {
    crm: [
        {
            type: CapabilityType.FUNCTIONS,
            title: 'Zoho CRM Functions',
            icon: 'material-symbols:function',
            portFactory: crmFunctionsCapabilityPortFactory,
        },
        {
            type: CapabilityType.WORKFLOWS,
            title: 'Zoho CRM Workflows',
            icon: 'mdi:workflow',
            portFactory: crmWorkflowCapabilityPortFactory,
        },
        {
            type: CapabilityType.MODULES,
            title: 'Zoho CRM Modules Metadata',
            icon: 'streamline-sharp:module',
            portFactory: crmModulesCapabilityPortFactory,
        },
        // ...
    ],
}
```

**Types:**

```ts
export type ProviderCapability = {
    type: string
    title: string
    icon: string
    portFactory: CapabilityPortFactory
    hideInMenu?: boolean
}

export type CapabilityPortFactory = (provider: ServiceProvider) => Result<CapabilityPort>

export type CapabilityPort = {
    list(pagination: PaginationParams): Promise<PaginatedResult<ICapabilityEntity[]>>
}

export interface ICapabilityEntity extends IEntity {
    id: string
    displayName: string
}
```

**Example: Zoho CRM Functions Capability:**
```ts
export function crmFunctionsCapabilityPortFactory(provider: ServiceProvider): Result<CapabilityPort> {
    const metadata = assertCrmMetadata(provider)
    if (!metadata) return { ok: false, error: 'Invalid provider metadata' }

    return {
        ok: true,
        value: {
            async list(pagination: PaginationParams): Promise<PaginatedResult<ICapabilityEntity[]>> {
                if (!provider.tabId) return { ok: false, error: 'Provider offline' }

                const response = await fetchCrmFunctionsRequest(provider.tabId, metadata.orgId, pagination)
                if (!response.ok) return response

                const details = await fetchFunctionsDetails(provider.tabId, metadata, response.value)
                return {
                    ok: true,
                    value: mapManyToFunctionEntity(details),
                    meta: response.meta,
                }
            },
        },
    }
}
```

### ICapabilityEntity

`ICapabilityEntity` — це базовий інтерфейс для всіх даних, які повертаються через capability.  
Кожне capability працює з власним типом сутностей, але всі вони мають реалізовувати цей інтерфейс — щоб їх можна було:

- кешувати в локальну/індексну БД;
- використовувати у спільному UI (списки, таблиці, перегляд);
- підключати до глобального пошуку;
- уніфіковано відображати в розширенні.

```ts
export interface ICapabilityEntity extends IEntity {
    id: string
    displayName: string
}

// example: Function Entity
export interface IFunctionEntity<TOrigin extends IEntity = IEntity> extends ICapabilityEntity {
    id: string
    type: FunctionType
    displayName: string
    originEntity: TOrigin
    script?: string | null
}
```


### Global Search

**Registration:**

```ts
// config/global-search.config.ts

import type { GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { FunctionGlobalSearchModule } from '@/entities/function/model/function.global-search.module.ts'
import {
    FieldsGlobalSearchModule,
    ModulesGlobalSearchModule,
} from '@/entities/metadata/model/metadata.global-search.module.ts'
import { WorkflowGlobalSearchModule } from '@/entities/workflow/model/workflow.global-search.module.ts'

export const GlobalSearchModules: GlobalSearchModule[] = [
    FunctionGlobalSearchModule,
    WorkflowGlobalSearchModule,
    ModulesGlobalSearchModule,
    FieldsGlobalSearchModule,
]
```

**Example: Function Global Search Module**

```ts
import { CapabilityType } from '@/config/capabilities.config.ts'
import { selectProviderRecordsQuery } from '@/core/cache'
import type { ServiceProvider } from '@/core/types/provider.types.ts'
import type { GlobalSearchDocument, GlobalSearchModule } from '@/shared/libs/global-search/lib/global-search.types.ts'
import { AppRouteName } from '@/app/router/app-routes.ts'
import type { IFunctionEntity } from '@/entities/function/model/function.types.ts'

async function provideIndexDocuments(context?: Record<string, unknown>): Promise<GlobalSearchDocument[]> {
    if (!context || !context?.provider) {
        return []
    }

    const provider = context.provider as ServiceProvider

    const records = await selectProviderRecordsQuery<IFunctionEntity>(provider.id, CapabilityType.FUNCTIONS)
    if (!records.length) {
        return []
    }

    return records.map((i) => ({
        id: i.id,
        module: CapabilityType.FUNCTIONS,
        title: i.displayName,
        content: i.script || '',
    }))
}

export const FunctionGlobalSearchModule: GlobalSearchModule = {
    name: CapabilityType.FUNCTIONS,
    provideIndexDocuments,
    icon: 'material-symbols:function',
    getRoute: (document: GlobalSearchDocument) => ({
        name: AppRouteName.workspaceFunctions,
        params: { functionId: document.id },
    }),
}
```