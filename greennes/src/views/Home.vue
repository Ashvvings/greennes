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
    <AirQualitySection id="air-quality" />
    
    <!-- Rating Form Section -->
    <RatingForm id="comment" />
    
    <!-- Map Modal -->
    <MapModal
        :is-open="showMap"
        :title="mapTitle"
        :items="mapItems"
        :user-location="selectedLocation ?? undefined"
        :center-on="centerOn"
        @close="closeMapModal"
      />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

// Default location object to satisfy SearchBar's required prop typing before a real selection is made
const defaultLocation: Location = {
  name: '',
  lat: 0,
  lon: 0
}

// État du modal de carte
const showMap = ref(false)
const mapTitle = ref('')
const currentMapType = ref<'bike' | 'waste' | 'parks'>('parks')
const centerOn = ref<{ lat: number; lon: number; name: string } | undefined>(undefined)

// ==================== DONNÉES DES POINTS D'INTÉRÊT ====================

// Liste complète des parcs
const allParks = [
  {name: "Parc des Gayeulles", lat: 48.1300, lon: -1.6400, type: 'park' as const},
  {name: "Parc du Thabor", lat: 48.1144, lon: -1.6669, type: 'park' as const},
  {name: "Prairies Saint-Martin", lat: 48.1180, lon: -1.6720, type: 'park' as const},
  {name: "Parc de Bréquigny", lat: 48.0900, lon: -1.6790, type: 'park' as const},
  {name: "Coulée verte", lat: 48.1250, lon: -1.6480, type: 'park' as const},
  {name: "Parc Oberthür", lat: 48.1128, lon: -1.6594, type: 'park' as const},
  {name: "Parc du Landry", lat: 48.0910, lon: -1.6470, type: 'park' as const},
  {name: "Parc de Maurepas", lat: 48.1210, lon: -1.6460, type: 'park' as const},
  {name: "Parc de Beauregard", lat: 48.1260, lon: -1.7020, type: 'park' as const},
  {name: "Parc de Villejean", lat: 48.1190, lon: -1.7000, type: 'park' as const},
  {name: "Jardin Saint-Georges", lat: 48.1100, lon: -1.6780, type: 'park' as const},
  {name: "Jardin chinois du parc de Maurepas", lat: 48.1200, lon: -1.6460, type: 'park' as const},
  {name: "Jardin de la Confluence", lat: 48.1100, lon: -1.6830, type: 'park' as const},
  {name: "Plages de Baud", lat: 48.1120, lon: -1.6670, type: 'park' as const},
]

// Stations vélo (à adapter selon vos données réelles)
const bikeStations = [
  {name: "Station Gare", lat: 48.1034, lon: -1.6722, available: 5, type: 'bike' as const},
  {name: "Station République", lat: 48.1089, lon: -1.6789, available: 3, type: 'bike' as const},
  {name: "Station Sainte-Anne", lat: 48.1115, lon: -1.6815, available: 8, type: 'bike' as const},
  {name: "Station TNB", lat: 48.1053, lon: -1.6732, available: 2, type: 'bike' as const},
  {name: "Station Charles de Gaulle", lat: 48.1106, lon: -1.6728, available: 6, type: 'bike' as const},
]

// Points de collecte déchets alimentaires (à adapter)
const wastePoints = [
  {name: "Point de collecte Centre-Ville", lat: 48.1110, lon: -1.6800, type: 'waste' as const, hours: "24h/24"},
  {name: "Point de collecte Villejean", lat: 48.1190, lon: -1.7000, type: 'waste' as const, hours: "7h-20h"},
  {name: "Point de collecte Beauregard", lat: 48.1260, lon: -1.7020, type: 'waste' as const, hours: "7h-20h"},
]

// ==================== CALCUL DES DISTANCES ====================

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`
  }
  return `${km.toFixed(1)}km`
}

// ==================== ITEMS POUR LA CARTE ====================

const mapItems = computed(() => {
  if (!selectedLocation.value) return []
  
  let items: any[] = []
  
  // Sélectionner les items selon le type de carte
  switch (currentMapType.value) {
    case 'parks':
      items = allParks
      break
    case 'bike':
      items = bikeStations
      break
    case 'waste':
      items = wastePoints
      break
  }
  
  // Ajouter les distances calculées
  return items.map(item => ({
    ...item,
    distance: calculateDistance(
      selectedLocation.value!.lat,
      selectedLocation.value!.lon,
      item.lat,
      item.lon
    ),
    formattedDistance: formatDistance(
      calculateDistance(
        selectedLocation.value!.lat,
        selectedLocation.value!.lon,
        item.lat,
        item.lon
      )
    )
  }))
})

// ==================== GESTION DES ÉVÉNEMENTS ====================

const handleLocationSelected = (location: Location) => {
  selectedLocation.value = location
  console.log('Location sélectionnée:', location)
}

const showBikeMap = (data?: { centerOn?: { lat: number; lon: number; name: string } }) => {
  currentMapType.value = 'bike'
  mapTitle.value = 'Vélos - Stations et Parkings'
  centerOn.value = data?.centerOn
  showMap.value = true
}

const showWasteMap = (data?: { centerOn?: { lat: number; lon: number; name: string } }) => {
  currentMapType.value = 'waste'
  mapTitle.value = 'Déchets Alimentaires'
  centerOn.value = data?.centerOn
  showMap.value = true
}

const showParksMap = (data?: { centerOn?: { lat: number; lon: number; name: string } }) => {
  currentMapType.value = 'parks'
  mapTitle.value = data?.centerOn?.name || 'Parcs et Jardins'
  centerOn.value = data?.centerOn
  showMap.value = true
}

const closeMapModal = () => {
  showMap.value = false
  centerOn.value = undefined
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