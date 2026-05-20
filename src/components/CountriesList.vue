<template>
  <div class="col-5" style="max-height: 80vh; overflow-y: scroll;">
    <div class="list-group text-center">
      <router-link
        v-for="country in countries"
        :key="country.alpha3Code"
        :to="'/' + country.alpha3Code"
        class="list-group-item list-group-item-action d-flex flex-column align-items-center p-3"
      >
        <img
          v-if="country.alpha2Code"
          :src="'https://flagpedia.net/data/flags/icon/72x54/' + country.alpha2Code.toLowerCase() + '.png'"
          style="width: 50px;"
          class="mb-2"
          alt="flag"
        />
        <p class="m-0 fw-bold">{{ country.name?.common || 'Unknown' }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  countries: Array
});
</script>