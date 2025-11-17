<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { calculateDistance, formatDistance } from '../utils/geoLocation'
import type { Location } from '../types/location'

const props = defineProps<{ location: Location }>()

interface WasteItem {
  name: string
  lat: number
  lon: number
  formattedDistance?: string
}

const loading = ref(true)
const daBins = ref<WasteItem[]>([])
const composts = ref<WasteItem[]>([])

const fetchDaBins = async () => {
  const response = await fetch(
    'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/points-apport-volontaire/records?where=code_carto%3D%22DA%22&limit=50'
  )
  const data = await response.json()
  daBins.value = data.results
    .filter((item: any) => item.geo_point_2d && typeof item.geo_point_2d.lat === "number" && typeof item.geo_point_2d.lon === "number")
    .map((item: any) => ({
      name: 'Poubelle déchets alimentaires',
      lat: item.geo_point_2d.lat,
      lon: item.geo_point_2d.lon
    }))
}

const fetchComposts = async () => {
  const response = await fetch(
    'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/composteurs-collectifs/records?limit=100'
  )
  const data = await response.json()
  composts.value = data.results
    .filter((item: any) => item.geo_point_2d && typeof item.geo_point_2d.lat === "number" && typeof item.geo_point_2d.lon === "number")
    .map((item: any) => ({
      name: 'Composteur',
      lat: item.geo_point_2d.lat,
      lon: item.geo_point_2d.lon
    }))
}

const sortedDaBins = computed(() =>
  daBins.value
    .map(item => ({
      ...item,
      formattedDistance: formatDistance(calculateDistance(props.location.lat, props.location.lon, item.lat, item.lon))
    }))
    .sort((a, b) =>
      calculateDistance(props.location.lat, props.location.lon, a.lat, a.lon) -
      calculateDistance(props.location.lat, props.location.lon, b.lat, b.lon)
    )
    .slice(0, 2)
)

const sortedComposts = computed(() =>
  composts.value
    .map(item => ({
      ...item,
      formattedDistance: formatDistance(calculateDistance(props.location.lat, props.location.lon, item.lat, item.lon))
    }))
    .sort((a, b) =>
      calculateDistance(props.location.lat, props.location.lon, a.lat, a.lon) -
      calculateDistance(props.location.lat, props.location.lon, b.lat, b.lon)
    )
    .slice(0, 2)
)

const sortedWasteData = computed(() => [
  ...sortedDaBins.value,
  ...sortedComposts.value
])

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchDaBins(), fetchComposts()])
  loading.value = false
})
</script>

<template>
  <div class="category-card">
    <div class="card-header">
      <svg class="card-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
      <h3>Déchets alimentaires</h3>
      <p class="subtitle">Composts et poubelles</p>
    </div>
    <div class="card-content">
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else-if="sortedWasteData.length" class="items-list">
        <div v-for="(item, idx) in sortedWasteData" :key="idx" class="item">
          <div class="item-header"><h4>{{ item.name }}</h4></div>
          <p class="item-detail"><span class="distance">{{ item.formattedDistance }}</span></p>
        </div>
      </div>
    </div>
    <button @click="$emit('show-map')" class="btn-more">Voir plus</button>
  </div>
</template>


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

.item-header h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #1B0808;
}

.item-detail {
  margin: 0.25rem 0 0 0;
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
