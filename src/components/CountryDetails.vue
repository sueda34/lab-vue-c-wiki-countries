<template>
  <div v-if="country" class="text-start p-4">
    <img 
      v-if="country.alpha2Code"
      :src="'https://flagpedia.net/data/flags/icon/72x54/' + country.alpha2Code.toLowerCase() + '.png'" 
      style="width: 150px;" 
      class="mb-4 shadow-sm" 
      alt="flag" 
    />
    <h1 class="mb-4">{{ country.name?.common }}</h1>
    
    <table class="table">
      <tbody>
        <tr>
          <td style="width: 30%;" class="fw-bold">Capital</td>
          <td>{{ country.capital && country.capital[0] ? country.capital[0] : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="fw-bold">Area</td>
          <td>{{ country.area }} km²</td>
        </tr>
        <tr>
          <td class="fw-bold">Borders</td>
          <td>
            <ul v-if="borderCountries.length" class="list-unstyled mb-0">
              <li v-for="border in borderCountries" :key="border.code" class="mb-1">
                <router-link :to="'/' + border.code" class="text-decoration-none">
                  {{ border.name }}
                </router-link>
              </li>
            </ul>
            <span v-else class="text-muted">No bordering countries</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div v-else class="text-center p-5 text-muted">
    <p>Select a country to see the details...</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const country = ref(null);
const loadedCountries = ref([]);
const baseUrl = import.meta.env.BASE_URL;

const loadLocalCountries = async () => {
  if (loadedCountries.value.length) {
    return loadedCountries.value;
  }

  try {
    const response = await fetch(`${baseUrl}countries.json`);
    if (!response.ok) {
      throw new Error(`Local countries.json returned ${response.status}`);
    }
    loadedCountries.value = await response.json();
  } catch (error) {
    console.warn('Lokale Länderdatei konnte nicht geladen werden:', error);
    loadedCountries.value = [];
  }

  return loadedCountries.value;
};

const fetchCountryDetails = async () => {
  const countryCode = route.params.alpha3Code;
  if (!countryCode) {
    country.value = null;
    return;
  }

  try {
    const response = await fetch(`https://ih-countries-api.herokuapp.com/countries/${countryCode}`);
    if (!response.ok) {
      throw new Error(`Live API returned ${response.status}`);
    }
    country.value = await response.json();
  } catch (error) {
    console.warn('Live API failed, loading local data instead:', error);
    const countries = await loadLocalCountries();
    country.value = countries.find((item) => item.alpha3Code === countryCode) || null;
  }
};

const borderCountries = computed(() => {
  if (!country.value?.borders?.length) {
    return [];
  }

  return loadedCountries.value.length
    ? country.value.borders.map((code) => {
        const borderCountry = loadedCountries.value.find((item) => item.alpha3Code === code);
        return {
          code,
          name: borderCountry?.name?.common || code,
        };
      })
    : country.value.borders.map((code) => ({ code, name: code }));
});

watch(
  () => route.params.alpha3Code,
  fetchCountryDetails,
  { immediate: true }
);
</script>