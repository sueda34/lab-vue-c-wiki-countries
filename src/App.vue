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

onMounted(async () => {
  try {
    const response = await fetch("/countries.json");
    const data = await response.json();
    
    // Alphabetisch sortieren
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    countries.value = data;
  } catch (error) {
    console.error("Fehler beim Laden der Länderliste:", error);
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