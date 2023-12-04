<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold d-flex justify-content-end"> 


          <router-link to="/Addcountry" class="btn btn-primary btn-sm">
            {{ $t("message.Add_Country") }}

          </router-link>

        </p>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
        </div>
      </div>
    </div>
  </div>

  <div v-if="!loading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-danger fw-bold">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6" v-for="country of countryies" :key="country">
        <div class="card my-2 list-group-item-primary shadow-lg">
          <div class="card-body">
            <div class="row align-items-center mb-2">
              <div class="col-sm-6 d-flex justify-content-center">
                <Icon icon="openmoji:deep-purple-flag" width="200" />              </div>
              <div class="col-sm-6">
                <ul class="list-group">
                  <li class="list-group-item"> {{ $t("message.Name") }}
                    : <span class="fw-bold">{{ country.name }} </span></li>
                  <li class="list-group-item"> {{ $t("message.capital") }}: <span class="fw-bold">{{ country.capital
                  }}</span></li>
                  <li class="list-group-item"> {{ $t("message.ISOcode") }}: <span class="fw-bold">{{ country.ISOcode
                  }}</span></li>
                  <li class="list-group-item"> {{ $t("message.region") }}: <span class="fw-bold">{{ country.region
                  }}</span></li>
                  <li class="list-group-item"> {{ $t("message.language") }}: <span class="fw-bold">{{ country.lang
                  }}</span></li>
                </ul>
              </div>

            </div>

            <div class="row  ">
              <div class="col-sm-12 d-flex   ">
                <router-link :to="`/view/${country.id}`" class="btn btn-success btn-sm my-1 m-2">
                  {{ $t("message.view") }}</router-link>
                <router-link :to="`/EditCountry/${country.id}`" class="btn btn-primary btn-sm my-1 m-2">
                  {{ $t("message.edit") }}
                </router-link>
                <button class="btn btn-danger btn-sm my-1 m-2"  @click="deletecountry(country.id)">
                  {{ $t("message.delete") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import swal from 'sweetalert';
import { Icon } from '@iconify/vue';

export default {
  name: "countryiesList",
	components: {
		Icon,
	},
  data: function () {

    return {
      loading: false,
      countryies: [],
      errorMessage: null,

    }
  },
  mounted() {
    this.getData();
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
    async deletecountry(id) {
      await fetch("http://localhost:3000/countries/" + id, {
        method: "DELETE",
      }).then(location.reload());
      swal({
        text: "country deleted successfully",
        icon: "success",
      }).catch((err) => console.log(err));
      swal({
        text: errorsText,
        icon: "error",
      });
    },
  },


};
</script>
  