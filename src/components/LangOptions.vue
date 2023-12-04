<template>
    <select  class="btn  outline btn-primary" @change="switchLanguage">
      <option
        v-for="sLocale in supportedLocales"
        :key="`locale-${sLocale}`"
        :value="sLocale"
        :selected="lang === sLocale"
      >
        {{ t(`locale.${sLocale}`) }}
      </option>
    </select>
  </template>
  
  <script>
    import { useI18n } from 'vue-i18n'
    import Tr from "@/i18n/translation"
  
    export default {
      setup() {
        const { t, locale } = useI18n()
        const supportedLocales = Tr.supportedLocales  

  
        return { t, locale, supportedLocales }
      },
      props: {
        lang: String
      },
      methods: {
        switchLanguage(event){
            this.$emit('changeonce', event.target.value);
        }
      }
    }
  </script>