<script setup lang="ts">
import type { IUser } from "@zoho-ide/backend-api/user";
import { DataTable, Column } from "primevue";

defineProps<{ users: IUser[] }>();
</script>

<template>
    <DataTable
        :value="users"
        striped-rows
        row-hover
        size="small"
        scrollable
        scroll-height="flex"

    >
        <Column field="id" header="id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
    </DataTable>
</template>

<style scoped></style>
