<template>
  <div id="app">
    <NavBar />

    <div class="container">
      <div class="row">
        <CountriesList :countries="countries" />

        <div class="col-7">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import CountriesList from './components/CountriesList.vue';

const countries = ref([]);
const baseUrl = import.meta.env.BASE_URL;

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}countries.json`);
    if (!response.ok) {
      throw new Error(`Local countries.json returned ${response.status}`);
    }

    const data = await response.json();
    data.sort((a, b) => {
      const nameA = a.name?.common || "";
      const nameB = b.name?.common || "";
      return nameA.localeCompare(nameB);
    });
    countries.value = data;
  } catch (error) {
    console.warn("Lokale Daten konnten nicht geladen werden, versuche Live-API...", error);

    try {
      const response = await fetch("https://ih-countries-api.herokuapp.com/countries");
      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => {
          const nameA = a.name?.common || "";
          const nameB = b.name?.common || "";
          return nameA.localeCompare(nameB);
        });
        countries.value = data;
      } else {
        throw new Error(`API returned ${response.status}`);
      }
    } catch (remoteError) {
      console.error("Fehler beim Laden der Länderliste aus der API:", remoteError);
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>