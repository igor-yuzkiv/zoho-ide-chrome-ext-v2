<script setup lang="ts">
import { AppRouteName } from '@/app/router/app-routes.ts'
import { IconButton, ListBox } from '@zoho-ide/ui-kit/components'
</script>

<template>
    <ListBox class="px-2" :items="[]" searchable :search-fields="['name']">
        <template #search-extra>
            <IconButton icon="ic:baseline-plus" text as="router-link" :to="{ name: AppRouteName.kbNewArticle }" />
        </template>
    </ListBox>
</template>

<style scoped></style>
