<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
      
      <div class="map-container" ref="mapElement"></div>
      
      <div v-if="selectedItem" class="item-details">
        <h4>{{ selectedItem.name }}</h4>
        <p v-if="selectedItem.hours">Horaires: {{ selectedItem.hours }}</p>
        <p v-if="selectedItem.available">Disponibles: {{ selectedItem.available }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, nextTick, onUnmounted } from 'vue'
import L from 'leaflet'

type Item = {
  lat?: number
  lon?: number
  name?: string
  hours?: string
  available?: number
}

const props = defineProps<{
  isOpen: boolean
  title?: string
  items?: Item[]
}>()

const emit = defineEmits(['close'])

const mapElement = ref<HTMLDivElement | null>(null)
const selectedItem = ref<Item | null>(null)
let mapInstance: L.Map | null = null

const closeModal = () => {
  // clear selection when closing
  selectedItem.value = null
  emit('close')
}

const initializeMap = () => {
  if (!mapElement.value) return

  if (mapInstance) {
    mapInstance.remove()
  }

  mapInstance = L.map(mapElement.value).setView([48.1173, -1.6778], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(mapInstance)

  // Add markers for items if provided
  if (props.items && Array.isArray(props.items)) {
    props.items.forEach((item: Item) => {
      if (typeof item.lat === 'number' && typeof item.lon === 'number') {
        L.marker([item.lat, item.lon])
          .bindPopup(`<strong>${item.name ?? ''}</strong>`)
          .addTo(mapInstance as L.Map)
          .on('click', () => {
            selectedItem.value = item
          })
      }
    })
  }
}

// Initialize map when modal opens. Use nextTick to ensure DOM is ready.
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
  max-height: 80vh;
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
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #1B0808;
}

.map-container {
  flex: 1;
  min-height: 400px;
  position: relative;
}

.item-details {
  padding: 1rem 1.5rem;
  background-color: #F9F9F9;
  border-top: 1px solid #E0E0E0;
}

.item-details h4 {
  margin: 0 0 0.5rem 0;
  color: #1B0808;
}

.item-details p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
