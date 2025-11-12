<template>
  <div class="home-view">
    <!-- Search Bar -->
    <SearchBar @location-selected="handleLocationSelected" />

    <!-- Main Content Section -->
    <section v-if="selectedLocation" class="main-content" id="home-cards">
      <div class="container">
        <h2 class="section-title">Équipements à proximité</h2>
        <div class="cards-grid">
          <!-- Pass correct props to all cards -->
          <BikeCard 
            :location="selectedLocation.name" 
            :user-lat="selectedLocation.lat"
            :user-lon="selectedLocation.lon"
            @show-map="showBikeMap" 
          />
          <FoodWasteCard 
            :location="selectedLocation.name" 
            :user-lat="selectedLocation.lat"
            :user-lon="selectedLocation.lon"
            @show-map="showWasteMap" 
          />
          <ParksCard 
            :location="selectedLocation.name" 
            :user-lat="selectedLocation.lat"
            :user-lon="selectedLocation.lon"
            @show-map="showParksMap" 
          />
        </div>
      </div>
    </section>

    <!-- Air Quality Section -->
    <AirQualitySection />

    <!-- Rating Form Section -->
    <RatingForm />

    <!-- Map Modal -->
    <!-- Pass correct props including isOpen -->
    <MapModal
      :is-open="showMap"
      :title="mapTitle"
      :items="mapItems"
      :user-lat="selectedLocation?.lat"
      :user-lon="selectedLocation?.lon"
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

interface LocationData {
  name: string
  lat: number
  lon: number
}

const selectedLocation = ref<LocationData | null>(null)
const showMap = ref(false)
const mapTitle = ref('')
const mapItems = ref([])

const handleLocationSelected = (location: LocationData) => {
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

.main-content {
  background-color: #FCF3DF;
  padding: 2rem 1rem;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.8rem;
  color: #1B0808;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem 0.75rem;
  }

  .section-title {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .container {
    padding: 0 0.75rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem 0.5rem;
  }

  .section-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .cards-grid {
    gap: 1rem;
  }

  .container {
    padding: 0 0.5rem;
  }
}
</style>
