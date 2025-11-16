<script setup lang="ts">
import { TestComp } from '@zoho-ide/ui-kit'
import { Button } from 'primevue'
import axios from 'axios'


function test() {
    axios.get('/api/users').then(res => console.log(res.data))
}

</script>

<template>
    <main>Admin APP: Home</main>
    <TestComp></TestComp>
    <Button @click="test">Test</Button>
</template>
