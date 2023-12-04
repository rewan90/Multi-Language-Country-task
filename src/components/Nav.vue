<template>
<nav class="navbar navbar-light" style="background-color: #e3f2fd;">
          <LanguageSwitcher></LanguageSwitcher>

</nav>
  </template>
  
  <script>
    import LanguageSwitcher from "@/components/LanguageSwitcher.vue"
    import Tr from "@/i18n/translation"
  
    export default {
      components: { LanguageSwitcher },
      setup() {
        return { Tr }
      }
    }
  </script>