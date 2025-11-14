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
        <!-- display sorted items with distance -->
        <div v-for="(item, idx) in sortedWasteData.slice(0, 3)" :key="idx" class="item">
          <div class="item-header">
            <h4>{{ item.name }}</h4>
          </div>
          <p class="item-detail">
            {{ item.distance }}<br/>
            <span class="distance" v-if="item.formattedDistance">{{ item.formattedDistance }}</span>
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

interface WasteItem {
  name: string
  distance: string
  lat: number
  lon: number
  formattedDistance?: string
}

const props = defineProps({
  location: String,
  userLat: Number,
  userLon: Number
})

const emit = defineEmits(['show-map'])

const loading = ref(true)
const wasteData = ref<WasteItem[]>([])

const sortedWasteData = computed(() => {
  if (!props.userLat || !props.userLon) return wasteData.value

  return [...wasteData.value]
    .map((item) => ({
      ...item,
      formattedDistance: formatDistance(
        calculateDistance(props.userLat!, props.userLon!, item.lat, item.lon)
      )
    }))
    .sort((a, b) => {
      const distA = calculateDistance(props.userLat!, props.userLon!, a.lat, a.lon)
      const distB = calculateDistance(props.userLat!, props.userLon!, b.lat, b.lon)
      return distA - distB
    })
})

const fetchWasteData = async () => {
  try {
    loading.value = true
    const response = await fetch(
      'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/composteurs-collectifs/records?limit=10'
    )
    const data = await response.json()
    
    wasteData.value = data.results.map((item: any) => ({
      name: item.nom || 'Composteur',
      distance: item.adresse || 'Rennes',
      lat: item.coordonnees?.lat,
      lon: item.coordonnees?.lon
    }))
  } catch (error) {
    console.error('Erreur chargement déchets:', error)
    wasteData.value = [
      { name: '3 composts à proximité', distance: '(10m, 45m, 200m)', lat: 48.1173, lon: -1.6778 },
      { name: '2 poubelles de déchets alimentaires', distance: '(15m, 60m)', lat: 48.1180, lon: -1.6800 }
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWasteData()
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
