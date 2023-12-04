<template>
  <div class="container mt-4 ">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold"> {{ $t("message.Country_Details") }}</p>
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

  <div v-if="!loading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-danger fw-bold">{{errorMessage}}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-4" v-if="!loading && isDone()">
    <div class="row align-items-cente">
      <div class="col-sm-4">
        <i class="fa fa-country-circle fa-8x"></i>
      </div>
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item"> {{ $t("message.Name") }} : <span class="fw-bold">{{ country.name }}</span></li>
                  <li class="list-group-item">{{ $t("message.capital") }} : <span class="fw-bold">{{ country.capital }}</span></li>
                  <li class="list-group-item">{{ $t("message.ISOcode") }} : <span class="fw-bold">{{ country.ISOcode }}</span></li>
                  <li class="list-group-item">{{ $t("message.region") }} : <span class="fw-bold">{{ country.region }}</span></li>
        </ul>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col">
        <router-link to="/" class="btn btn-primary">
          Back
        </router-link>
      </div>
    </div>
  </div>
</template>
  
<script>

export default {
  name: "CountryDetails",

  data() {
    return {
      CountryId: this.$route.params.CountryId,
      country: {},
      errorMassage: null,
      loading: false
    }
  },
  //get api data
   created: async function () {
    this.loading = true;
    fetch('http://localhost:3000/countries/' + this.$route.params.CountryId)
      .then(res => res.json())
      .then(data => this.country = data)
      .catch(err => console.log(err))
    console.log(this.country);

    this.loading = false;

  },
  methods: {
    isDone: function () {
      return Object.keys(this.country).length > 0;
    }

  }

};
</script>
  