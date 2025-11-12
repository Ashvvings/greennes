<template>
  <div class="category-card">
    <div class="card-header">
      <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="17" r="3"></circle>
        <circle cx="6" cy="17" r="3"></circle>
        <path d="M4 6h16M4 12h16"></path>
      </svg>
      <h3>Vélos</h3>
      <p class="subtitle">Location et stationnement</p>
    </div>

    <div class="card-content">
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else-if="sortedBikeData.length" class="items-list">
        <!-- display sorted items with distance -->
        <div v-for="(item, idx) in sortedBikeData.slice(0, 3)" :key="idx" class="item">
          <div class="item-header">
            <svg v-if="item.type === 'station'" class="item-icon" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="9"></circle>
            </svg>
            <svg v-else class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            </svg>
            <h4>{{ item.name }}</h4>
          </div>
          <p class="item-detail" v-if="item.type === 'station'">
            disponibles : {{ item.available }}<br/>
            emplacements : {{ item.capacity }}<br/>
            <span class="distance">{{ item.formattedDistance }}</span>
          </p>
          <p class="item-detail" v-else>
            disponibles : {{ item.available }}<br/>
            <span class="distance">{{ item.formattedDistance }}</span>
          </p>
        </div>
      </div>
    </div>

    <button @click="$emit('show-map')" class="btn-more">Voir plus</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits, computed } from 'vue'
import { calculateDistance, formatDistance } from '../utils/geoLocation'

interface BikeItem {
  name: string
  type: 'station' | 'parking'
  available: number
  capacity?: number
  lat: number
  lon: number
  distance?: number
  formattedDistance?: string
}

const props = defineProps({
  location: String,
  userLat: Number,
  userLon: Number
})

const emit = defineEmits(['show-map'])

const loading = ref(true)
const bikeData = ref<BikeItem[]>([])

const sortedBikeData = computed(() => {
  if (!props.userLat || !props.userLon) return bikeData.value

  return [...bikeData.value]
    .map((item) => ({
      ...item,
      distance: calculateDistance(props.userLat!, props.userLon!, item.lat, item.lon),
      formattedDistance: formatDistance(
        calculateDistance(props.userLat!, props.userLon!, item.lat, item.lon)
      )
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
})

const fetchBikeData = async () => {
  try {
    loading.value = true
    const response = await fetch(
      'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/etat-des-stations-le-velo-star-en-temps-reel/records?limit=10'
    )
    const data = await response.json()
    
    bikeData.value = data.results.map((station: any) => ({
      name: station.nom_station,
      type: 'station',
      available: station.nombrevelosdisponibles,
      capacity: station.nombreemplacementsdisponibles,
      lat: station.coordonnees.lat,
      lon: station.coordonnees.lon
    }))
  } catch (error) {
    console.error('Erreur chargement vélos:', error)
    bikeData.value = [
      { name: 'Station Sainte-Anne', type: 'station', available: 13, capacity: 13, lat: 48.1123, lon: -1.6789 },
      { name: 'Station Hoche', type: 'station', available: 13, capacity: 13, lat: 48.1145, lon: -1.6756 },
      { name: 'Parking Hoche', type: 'parking', available: 13, lat: 48.1140, lon: -1.6750, capacity: 0 }
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBikeData()
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
