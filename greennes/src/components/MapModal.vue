<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
      
      <div class="map-container" ref="mapElement"></div>
      
      <!-- Légende -->
      <div class="map-legend">
        <div class="legend-item">
          <div class="legend-marker park"></div>
          <span>Parcs et jardins</span>
        </div>
        <div class="legend-item">
          <div class="legend-marker bike"></div>
          <span>Stations vélo</span>
        </div>
        <div class="legend-item">
          <div class="legend-marker user"></div>
          <span>Votre position</span>
        </div>
      </div>
      
      <!-- Détails de l'élément sélectionné -->
      <div v-if="selectedItem" class="item-details">
        <h4>{{ selectedItem.name }}</h4>
        <p v-if="selectedItem.type" class="item-type">
          {{ selectedItem.type === 'park' ? '🌳 Parc' : '🚲 Station vélo' }}
        </p>
        <p v-if="selectedItem.hours">⏰ Horaires: {{ selectedItem.hours }}</p>
        <p v-if="selectedItem.available !== undefined">
          ✅ Vélos disponibles: {{ selectedItem.available }}
        </p>
        <p v-if="selectedItem.formattedDistance" class="distance-info">
          📍 Distance: {{ selectedItem.formattedDistance }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import L from 'leaflet'

interface Item {
  lat?: number
  lon?: number
  name?: string
  hours?: string
  available?: number
  formattedDistance?: string
  type?: 'park' | 'bike'
}

interface Props {
  isOpen: boolean
  title?: string
  items?: Item[]
  userLocation?: { lat: number; lon: number }
  centerOn?: { lat: number; lon: number; name?: string } // Point spécifique à centrer
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const mapElement = ref<HTMLDivElement | null>(null)
const selectedItem = ref<Item | null>(null)
let mapInstance: L.Map | null = null

// Icônes personnalisées pour les différents types de marqueurs
const createParkIcon = () => {
  return L.divIcon({
    html: '<div class="custom-marker park-marker">🌳</div>',
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  })
}

const createBikeIcon = () => {
  return L.divIcon({
    html: '<div class="custom-marker bike-marker">🚲</div>',
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  })
}

const createUserIcon = () => {
  return L.divIcon({
    html: '<div class="custom-marker user-marker">📍</div>',
    className: 'custom-div-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 36]
  })
}

const closeModal = () => {
  selectedItem.value = null
  emit('close')
}

const initializeMap = () => {
  if (!mapElement.value) return
  
  if (mapInstance) {
    mapInstance.remove()
  }

  // Déterminer le centre de la carte
  let center: [number, number] = [48.1173, -1.6778] // Centre de Rennes par défaut
  let zoom = 13

  if (props.centerOn && props.centerOn.lat && props.centerOn.lon) {
    // Si on a un point spécifique à centrer (parc ou station cliqué)
    center = [props.centerOn.lat, props.centerOn.lon]
    zoom = 15
  } else if (props.userLocation) {
    // Sinon, centrer sur la position de l'utilisateur
    center = [props.userLocation.lat, props.userLocation.lon]
    zoom = 14
  }

  mapInstance = L.map(mapElement.value).setView(center, zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(mapInstance)

  // Ajouter le marqueur de position utilisateur
  if (props.userLocation) {
    L.marker([props.userLocation.lat, props.userLocation.lon], {
      icon: createUserIcon()
    })
      .bindPopup('<strong>Votre position</strong>')
      .addTo(mapInstance)
  }

  // Ajouter les marqueurs pour les items
  if (props.items && Array.isArray(props.items)) {
    props.items.forEach((item: Item) => {
      if (typeof item.lat === 'number' && typeof item.lon === 'number') {
        const icon = item.type === 'bike' ? createBikeIcon() : createParkIcon()
        
        const marker = L.marker([item.lat, item.lon], { icon })
          .addTo(mapInstance as L.Map)
          .on('click', () => {
            selectedItem.value = item
          })

        // Popup personnalisée
        let popupContent = `<div class="custom-popup"><strong>${item.name ?? ''}</strong>`
        if (item.formattedDistance) {
          popupContent += `<br><span class="popup-distance">📍 ${item.formattedDistance}</span>`
        }
        if (item.available !== undefined) {
          popupContent += `<br><span class="popup-bikes">🚲 ${item.available} disponibles</span>`
        }
        popupContent += '</div>'
        
        marker.bindPopup(popupContent)

        // Si c'est l'élément sur lequel on veut centrer, ouvrir son popup
        if (props.centerOn && 
            item.lat === props.centerOn.lat && 
            item.lon === props.centerOn.lon) {
          marker.openPopup()
          selectedItem.value = item
        }
      }
    })
  }
}

watch(() => props.isOpen, (newVal: boolean) => {
  if (newVal) {
    nextTick(() => initializeMap())
  }
})

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #E0E0E0;
}

.modal-header h3 {
  margin: 0;
  color: #1B0808;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #1B0808;
}

.map-container {
  flex: 1;
  min-height: 400px;
  position: relative;
}

/* Légende */
.map-legend {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: #F9F9F9;
  border-top: 1px solid #E0E0E0;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.legend-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.legend-marker.park {
  background-color: #4CAF50;
  color: white;
}

.legend-marker.park::before {
  content: '🌳';
}

.legend-marker.bike {
  background-color: #2196F3;
  color: white;
}

.legend-marker.bike::before {
  content: '🚲';
}

.legend-marker.user {
  background-color: #FF5722;
  color: white;
}

.legend-marker.user::before {
  content: '📍';
}

/* Détails de l'élément */
.item-details {
  padding: 1rem 1.5rem;
  background-color: #FFFFFF;
  border-top: 2px solid #D4AF8F;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.item-details h4 {
  margin: 0 0 0.75rem 0;
  color: #1B0808;
  font-size: 1.1rem;
}

.item-details p {
  margin: 0.4rem 0;
  color: #666;
  font-size: 0.9rem;
}

.item-type {
  color: #D4AF8F;
  font-weight: 600;
}

.distance-info {
  color: #0EA5A4;
  font-weight: 600;
}

/* Styles globaux pour les marqueurs personnalisés */
:deep(.custom-marker) {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

:deep(.custom-marker:hover) {
  transform: scale(1.15);
}

:deep(.park-marker) {
  background-color: #4CAF50;
}

:deep(.bike-marker) {
  background-color: #2196F3;
}

:deep(.user-marker) {
  background-color: #FF5722;
  width: 36px;
  height: 36px;
  font-size: 1.8rem;
}

:deep(.custom-popup) {
  text-align: center;
}

:deep(.popup-distance) {
  color: #0EA5A4;
  font-weight: 600;
}

:deep(.popup-bikes) {
  color: #2196F3;
  font-weight: 600;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-header h3 {
    font-size: 1.1rem;
  }

  .map-container {
    min-height: 300px;
  }

  .map-legend {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }

  .item-details {
    padding: 1rem;
  }
}
</style>