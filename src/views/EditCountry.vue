<template>
  <div class="container mt-3 ">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">  {{ $t("message.Edit_country") }} </p>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- <spinner /> -->
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3 ">
    <div class="row">
      <div class="col-md-4 ">
        <Form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <input type="text" placeholder="Name" class="form-control" v-model="country.name" required>

          </div>
          <div class="mb-2">
            <input type="text" placeholder="capital" class="form-control" v-model="country.capital" required>
          </div>
          <div class="mb-2">
            <input type="text" placeholder="ISO code" class="form-control" v-model="country.ISOcode" required />
          </div>
          <div class="mb-2">
            <input type="text" placeholder="region" class="form-control" v-model="country.region" required />
          </div>

          <div class="mb-2 d-flex justify-content-between">
            <button type="submit" class="btn btn-primary" value="Update"> {{ $t("message.Update") }} </button>
            <router-link to="/" class="btn btn-primary">
              {{ $t("message.Back") }}
            </router-link>
          </div>
        </Form>

      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "EditCountry",

  data() {
    return {
      CountryId: this.$route.params.CountryId,
      country: {},
      errorMassage: null,
      loading: false,
      uri: "http://localhost:3000/countries/" + this.$route.params.CountryId,

    }
  },

  created: async function () {
    this.loading = true;
    fetch('http://localhost:3000/countries/' + this.$route.params.CountryId)
      .then(res => res.json())
      .then(data => this.country = data)
      .catch(err => console.log(err))
    console.log(this.country);

    this.loading = false;

  },
  //update api data

  methods: {

    handleSubmit() {
      fetch(this.uri, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.country.name,
          capital: this.country.capital,
          ISOcode: this.country.ISOcode,
          region: this.country.region,
          CountryId: this.country,

        }),
      })
        .then(() => {
          this.$router.push("/");
          swal({
            text: "country updateed successfully",
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
  }

};
</script>