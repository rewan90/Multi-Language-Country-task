<template>
  <nav class="navbar navbar-light" style="background-color: #e3f2fd;">

    <RouterLink  class="text-decoration-none" :to="Tr.i18nRoute({ name: 'CountryListPage' })">   
       <h1 class="ms-3 text-primary fw-bold "> {{ $t("message.Choose_Country") }}</h1>
    </RouterLink>


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
<style>

</style>