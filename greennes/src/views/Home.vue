<template>
  <div class="home-view">
    <!-- Navigation -->
    <nav class="navbar">
      <div></div>
      <div class="nav-center">
        <a href="#home-cards" class="nav-link">Accueil</a>
        <a href="#air-quality" class="nav-link">Qualité de l'air</a>
        <a href="#comment" class="nav-link">Commentaires</a>
        <router-link to="/about" class="nav-link">Qui sommes-nous ?</router-link>
      </div>
      <div></div>
    </nav>

    <!-- Search Bar -->
    <SearchBar @location-selected="handleLocationSelected" />

    <!-- Main Content Section -->
    <section v-if="selectedLocation" class="main-content" id="home-cards">
      <div class="container">
        <div class="cards-grid">
          <BikeCard :location="selectedLocation" @show-map="showBikeMap" />
          <FoodWasteCard :location="selectedLocation" @show-map="showWasteMap" />
          <ParksCard :location="selectedLocation" @show-map="showParksMap" />
        </div>
      </div>
    </section>

    <!-- Air Quality Section -->
    <AirQualitySection />

    <!-- Rating Form Section -->
    <RatingForm />

    <!-- Map Modal -->
    <MapModal
      :isOpen="showMap"
      :title="mapTitle"
      :items="mapItems"
      @close="closeMapModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import BikeCard from '../components/BikeCard.vue'
import FoodWasteCard from '../components/FoodWasteCard.vue'
import ParksCard from '../components/ParksCard.vue'
import AirQualitySection from '../components/AirQualitySection.vue'
import RatingForm from '../components/RatingForm.vue'
import MapModal from '../components/MapModal.vue'

const selectedLocation = ref('')
const showMap = ref(false)
const mapTitle = ref('')
const mapItems = ref([])

const handleLocationSelected = (location: string) => {
  selectedLocation.value = location
}

const showBikeMap = () => {
  mapTitle.value = 'Vélos - Stations et Parkings'
  showMap.value = true
}

const showWasteMap = () => {
  mapTitle.value = 'Déchets Alimentaires'
  showMap.value = true
}

const showParksMap = () => {
  mapTitle.value = 'Parcs et Jardins'
  showMap.value = true
}

const closeMapModal = () => {
  showMap.value = false
}
</script>

<style scoped>
.home-view {
  width: 100%;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #E8D5AA;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.nav-center {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.nav-link {
  color: #1B0808;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: #0EA5A4;
}

.main-content {
  background-color: #FCF3DF;
  padding: 2rem 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .navbar {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .nav-center {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
