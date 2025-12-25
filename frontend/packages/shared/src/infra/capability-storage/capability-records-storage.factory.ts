import type { CapabilityRecordsStorageStrategyType, ICapabilityRecordsStorage } from '../../contracts/capability'
import { LocalCapabilityRecordsStorage } from './local'

const STORAGE_STRATEGIES: Record<CapabilityRecordsStorageStrategyType, () => ICapabilityRecordsStorage> = {
    local: () => new LocalCapabilityRecordsStorage(),
}

export function capabilityRecordsStorageFactory(
    strategy: CapabilityRecordsStorageStrategyType
): ICapabilityRecordsStorage {
    return STORAGE_STRATEGIES[strategy]()
}
