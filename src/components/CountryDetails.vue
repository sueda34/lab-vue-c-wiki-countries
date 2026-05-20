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
            <ul v-if="country.borders && country.borders.length" class="list-unstyled mb-0">
              <li v-for="border in country.borders" :key="border" class="mb-1">
                <router-link :to="'/' + border" class="text-decoration-none">
                  {{ border }}
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
    <p>Wähle ein Land aus, um Details anzuzeigen...</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const country = ref(null);

const fetchCountryDetails = async () => {
  const countryCode = route.params.alpha3Code;
  if (!countryCode) {
    country.value = null;
    return;
  }

  try {
    const response = await fetch('/countries.json');
    const data = await response.json();
    country.value = Array.isArray(data)
      ? data.find((item) => item.alpha3Code === countryCode) || null
      : null;
  } catch (error) {
    console.error('Fehler beim Laden der Länder-Details:', error);
  }
};

watch(
  () => route.params.alpha3Code,
  () => {
    fetchCountryDetails();
  },
  { immediate: true });
</script>