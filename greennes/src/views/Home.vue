<template>
  <div class="home-view">
    <!-- Search Bar -->
    <SearchBar :location="selectedLocation ?? defaultLocation" @location-selected="handleLocationSelected" />

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
import type { Location } from '../types/location'

const props = defineProps<{
  location: Location
}>()

const selectedLocation = ref<Location | null>(null)

// default location object to satisfy SearchBar's required prop typing before a real selection is made
const defaultLocation: Location = {
  name: '',
  lat: 0,
  lon: 0
}

const showMap = ref(false)
const mapTitle = ref('')
const mapItems = ref([])

const handleLocationSelected = (location: Location) => {
  selectedLocation.value = location
  console.log('Location sélectionnée:', location)
  // Vous pouvez maintenant accéder facilement à location.name, location.lat, location.lon
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
  margin-top: 3rem;
}

.main-content {
  background-color: #FCF3DF;
  padding: 2rem 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* -------- GRID DES CARTES -------- */

.cards-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-areas: 
    "bike food park";
}

.cards-grid > :nth-child(1) { grid-area: bike; }
.cards-grid > :nth-child(2) { grid-area: food; }
.cards-grid > :nth-child(3) { grid-area: park; }

/* ---- TABLET (2 lignes) ---- */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "bike food"
      "park park";
  }
}

/* ---- MOBILE ---- */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "bike"
      "food"
      "park";
  }
}
</style>
