<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold d-flex justify-content-center">  {{ $t("message.Add_Country") }}</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <input type="text" placeholder="Name" class="form-control" v-model="name" required />
            <span class="text-danger" v-if="msg.name">{{ msg.name }}</span>
          </div>
          <div class="mb-2">
            <input type="text" placeholder="capital" class="form-control" v-model="capital" required />
            <span class="text-danger" v-if="msg.name">{{ msg.name }}</span>
          </div>
          <div class="mb-2">
            <input type="text" placeholder="ISO code" class="form-control" v-model="ISOcode" required />
            <span class="text-danger" v-if="msg.name">{{ msg.name }}</span>
          </div>
          <div class="mb-2">
            <input type="text" placeholder="region" class="form-control" v-model="region" required />
            <span class="text-danger" v-if="msg.name">{{ msg.name }}</span>
          </div>
          <div class="mb-2">
          {{ $t("message.choose_language") }} :
            <LangOptions :lang="lang" @changeonce="changeLang"></LangOptions>


          </div>

          <div class="mb-2">
            <button type="submit" class="btn btn-primary"> {{ $t("message.Add_Country") }} </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import swal from 'sweetalert';
import LangOptions from "@/components/LangOptions.vue"
import Tr from "@/i18n/translation"
export default {
  components: { LangOptions },
  name: "AddCountry",
  data: function () {
    return {
      name: "",
      lang: "en",
      capital: "",
      ISOcode: "",
      region: "",
      msg: [],
      Tr,
    };
  },


  methods: {
    handleSubmit() {
      let country = {
        name: this.name,
        capital: this.capital,
        ISOcode: this.ISOcode,
        region: this.region,
        lang: this.lang,
        parent_id: this.$route.params.CountryId == 0 ? null : this.$route.params.CountryId,
        id: Math.floor(Math.random() * 100000),
      };

      fetch("http://localhost:3000/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(country),
      })
        .then(() => {
          this.$router.push("/");
          swal({
            text: "country added successfully",
            icon: "success",
          });
        })
        .catch(function (error) {
          if (error.response) {
            let errorsText = "";
            error.response.data.forEach((element) => {
              errorsText =
                errorsText +
                element.field.toUpperCase() +
                " : " +
                element.message +
                "\n";
            });
            swal({
              text: errorsText,
              icon: "error",
            });
          } else if (error.request) {
            swal({
              text: error.request,
              icon: "error",
            });
          } else {
            swal({
              text: error.message,
              icon: "error",
            });
          }
        });
    },
    changeLang(newLang){
      console.log(newLang);
      this.lang = newLang
    }
  }
};
</script>


<style lang="scss" scoped></style>