<template>
  <div class="category-card">
    <div class="card-header">
      <FontAwesomeIcon :icon="['fas', 'bicycle']" class="card-icon" />
      <div class="header-content">
        <h3>Vélos</h3>
        <p class="subtitle">Location et stationnement</p>
      </div>
    </div>

    <div class="card-content">
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else-if="sortedBikeData.length" class="items-list">
        <div v-for="(item, idx) in sortedBikeData" :key="idx" class="item">
          <div class="item-header">
            <FontAwesomeIcon
              v-if="item.type === 'parking'"
              :icon="['fas', 'square-parking']"
              class="item-icon"
            />
            <FontAwesomeIcon
              v-else
              :icon="['fas', 'credit-card']"
              class="item-icon"
            />
            <h4>{{ item.name }}</h4>
          </div>
          <p class="item-detail" v-if="item.type === 'station'">
            disponibles : {{ item.available }}<br/>
            emplacements : {{ item.capacity }}<br/>
            <span class="distance">{{ item.formattedDistance }}</span>
          </p>
          <p class="item-detail" v-else>
            emplacements : {{ item.capacity }}<br/>
            <span class="distance">{{ item.formattedDistance }}</span>
          </p>
        </div>
      </div>
    </div>
    <button @click="$emit('show-map')" class="btn-more">Voir plus</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { calculateDistance, formatDistance } from '../utils/geoLocation'
import type { Location } from '../types/location'

interface BikeItem {
  name: string
  type: 'station' | 'parking'
  available?: number
  capacity?: number
  lat: number
  lon: number
  distance?: number
  formattedDistance?: string
  type_accroche?: string
  couverture?: boolean
  protection?: string
}

const props = defineProps<{
  location: Location
}>()

const emit = defineEmits(['show-map'])

const loading = ref(true)
const stations = ref<BikeItem[]>([])
const parkings = ref<BikeItem[]>([])

// Calculer les 2 stations et 1 parking les plus proches
const sortedStations = computed(() =>
  stations.value
    .map(item => ({
      ...item,
      distance: calculateDistance(props.location.lat, props.location.lon, item.lat, item.lon),
      formattedDistance: formatDistance(calculateDistance(props.location.lat, props.location.lon, item.lat, item.lon))
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, 2)
)
const sortedParkings = computed(() =>
  parkings.value
    .map(item => ({
      ...item,
      distance: calculateDistance(props.location.lat, props.location.lon, item.lat, item.lon),
      formattedDistance: formatDistance(calculateDistance(props.location.lat, props.location.lon, item.lat, item.lon))
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, 1)
)
const sortedBikeData = computed(() => [
  ...sortedStations.value,
  ...sortedParkings.value
])

//https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/etat-des-stations-le-velo-star-en-temps-reel/records?limit=60
const fetchStations = async () => {
  try{
  const response = await fetch(
    'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/etat-des-stations-le-velo-star-en-temps-reel/records?limit=60'
  )
  const data = await response.json()
  stations.value = data.results.map((station: any) => ({
      name: station.nom,
      type: 'station',
      available: station.nombrevelosdisponibles,
      capacity: station.nombreemplacementsactuels,
      lat: station.coordonnees.lat,
      lon: station.coordonnees.lon
    }))
  } catch (error) {
    console.error('Erreur chargement stations :', error)
    stations.value = [
      { name: 'Station Nulle', type: 'station', available: 13, capacity: 13, lat: 48.1123, lon: -1.6789 }
    ]
  } finally {
    loading.value = false
  }
}

const fetchParkings = async () => {
  try {
    // Parkings (local GeoJSON)
    const parkingsRes = await fetch('../public/data/data.geojson')
    const parkingsData = await parkingsRes.json()
    parkings.value = parkingsData.features
      .filter((f: any) => f.geometry && f.geometry.type === 'Point')
      .map((feature: any) => ({
        name: feature.properties?.nom || 'Parking vélo',
        type: 'parking',
        capacity: Number(feature.properties?.capacite) || 0,
        lat: feature.geometry.coordinates[1], // GeoJSON: [lon, lat]
        lon: feature.geometry.coordinates[0]
      }))
  } catch (error) {
    console.error('Erreur chargement parkings :', error)
    parkings.value = [
      { name: 'Parking Nul', type: 'parking', capacity: 8, lat: 48.114, lon: -1.675 }
    ]
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchStations(), fetchParkings()])
  loading.value = false
})
</script>

<style scoped>
.category-card {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  width: 32px;
  height: 32px;
  color: #D4AF8F;
  flex-shrink: 0;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1B0808;
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.card-content {
  flex: 1;
}

.loading, .items-list {
  min-height: 80px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item {
  padding: 0.75rem;
  background-color: #F9F9F9;
  border-radius: 8px;
  border-left: 3px solid #D4AF8F;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.item-icon {
  width: 20px;
  height: 20px;
  color: #0EA5A4;
}

.item-header h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #1B0808;
}

.item-detail {
  margin: 0.25rem 0 0 1.75rem;
  font-size: 0.85rem;
  color: #666;
}

.distance {
  color: #0EA5A4;
  font-weight: 600;
}

.btn-more {
  background-color: #D4AF8F;
  color: #1B0808;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  align-self: center;
}

.btn-more:hover {
  background-color: #C9A17A;
}

@media (max-width: 768px) {
  .category-card {
    padding: 1rem;
  }

  .card-header {
    gap: 0.75rem;
  }

  .card-icon {
    width: 28px;
    height: 28px;
  }

  .card-header h3 {
    font-size: 1rem;
  }

  .subtitle {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .category-card {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .btn-more {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>