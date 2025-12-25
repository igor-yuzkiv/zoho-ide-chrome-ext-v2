<script setup lang="ts">
import { NoDataMessage } from '@zoho-ide/ui-kit'
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <div class="flex items-center justify-center w-full h-full app-card">
            <NoDataMessage
                icon="carbon:ibm-watson-knowledge-catalog"
                title="Knowledge Base"
                message="Select an article to view details"
            />
        </div>
    </div>
</template>

<style scoped></style>
