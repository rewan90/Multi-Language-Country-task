
<template>
  <Nav></Nav>
  <RouterView />
  
</template>

<script setup >
import { RouterLink, RouterView } from 'vue-router'

import Nav from "../src/components/Nav.vue";

</script>
