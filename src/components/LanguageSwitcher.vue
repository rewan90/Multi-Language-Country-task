<template>
  <select class="btn  outline btn-primary" @change="switchLanguage">
    <option v-for="country in countryies" :key="`locale-${country.lang}`" :value="country.lang"
      :selected="locale === country.lang">
      {{ country.name }}
    </option>
  </select>
</template>
  
<script>
import { useI18n } from 'vue-i18n'
import { useRouter } from "vue-router"
import Tr from "@/i18n/translation"

export default {
  setup() {
    const { t, locale } = useI18n()

    const supportedLocales = Tr.supportedLocales

    const router = useRouter()

    const switchLanguage = async (event) => {
      const newLocale = event.target.value

      await Tr.switchLanguage(newLocale)

      try {
        await router.replace({ params: { locale: newLocale } })
      } catch (e) {
        console.log(e)
        router.push("/")
      }
    }

    return { t, locale, supportedLocales, switchLanguage }
  },
  methods: {
    async getData() {
      // fetch json data
      await fetch("http://localhost:3000/countries")
        .then((response) =>
          response.json().then(data => ({
            data: data,
            status: response.status
          })).then(res => {
            console.log(res.data)
            this.countryies = res.data
          }))
        .catch((err) => console.log(err));
    },
  },
  data: function () {
    return {
      countryies: [],

    }
  },
  mounted() {
    this.getData();
  },
}
</script>