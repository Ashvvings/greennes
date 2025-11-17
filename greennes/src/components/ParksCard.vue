<template>
  <div class="category-card">
    <div class="card-header">
      <svg class="card-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
      <div class="header-content">
        <h3>Parcs et jardins</h3>
        <p class="subtitle">Emplacements et horaires</p>
      </div>
    </div>

    <div class="card-content">
      <div class="carousel-wrapper">
        <button v-if="parks.length > 1" @click="prevSlide" class="carousel-btn prev">❮</button>
        
        <div class="carousel-container">
          <div class="carousel-slide" v-if="parks[currentSlide]">
            <img :src="parks[currentSlide].image" :alt="parks[currentSlide].name" />
            <div class="slide-info">
              <h4>{{ parks[currentSlide].name }}</h4>
              <!-- display calculated distance for current slide -->
              <p>{{ parks[currentSlide].formattedDistance || parks[currentSlide].distance }}</p>
            </div>
          </div>
        </div>
        
        <button v-if="parks.length > 1" @click="nextSlide" class="carousel-btn next">❯</button>
      </div>
    </div>

    <button @click="$emit('show-map')" class="btn-more">Voir plus</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue'
import { calculateDistance, formatDistance } from '../utils/geoLocation'
import type { Location } from '../types/location'

const props = defineProps<{
  location: Location
}>()

interface Park {
  name: string
  distance: string
  image: string
  lat?: number
  lon?: number
  formattedDistance?: string
}


const emit = defineEmits(['show-map'])

const currentSlide = ref(0)
const parks = ref<Park[]>([
  {
    name: 'Étang des Longs Champs',
    distance: '200m',
    image: '/placeholder.svg?height=200&width=300',
    lat: 48.1245,
    lon: -1.6890
  },
  {
    name: 'Parc des Gayeulles',
    distance: '500m',
    image: '/placeholder.svg?height=200&width=300',
    lat: 48.1156,
    lon: -1.6834
  },
  {
    name: 'Parc de la Préfecture',
    distance: '450m',
    image: '/placeholder.svg?height=200&width=300',
    lat: 48.1102,
    lon: -1.6745
  }
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % parks.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + parks.value.length) % parks.value.length
}

watch(() => [props.location.lat, props.location.lon], () => {
  if (props.location.lat && props.location.lon) {
    parks.value = parks.value.map(park => ({
      ...park,
      formattedDistance: park.lat && park.lon 
        ? formatDistance(calculateDistance(props.location.lat!, props.location.lon!, park.lat, park.lon))
        : park.distance
    }))
  }
}, { immediate: true })

onMounted(() => {
  // Load parks data from API if needed
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
  align-items: flex-start;
  gap: 1rem;
}

.header-content {
  flex: 1;
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

.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.carousel-container {
  flex: 1;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  min-width: 0;
}

.carousel-slide {
  height: 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 1rem;
  border-radius: 0 0 8px 8px;
}

.slide-info h4 {
  margin: 0;
  font-size: 1rem;
}

.slide-info p {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
}

.carousel-btn {
  background-color: #D4AF8F;
  color: #1B0808;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.carousel-btn:hover {
  background-color: #C9A17A;
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
  .card-header {
    align-items: center;
  }

  .carousel-wrapper {
    gap: 0.5rem;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .carousel-container {
    height: 150px;
  }

  .slide-info {
    padding: 0.75rem;
  }

  .slide-info h4 {
    font-size: 0.9rem;
  }

  .slide-info p {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .category-card {
    padding: 1rem;
    gap: 0.75rem;
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

  .carousel-wrapper {
    gap: 0.25rem;
  }

  .carousel-btn {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .carousel-container {
    height: 120px;
  }

  .slide-info {
    padding: 0.5rem;
  }

  .slide-info h4 {
    font-size: 0.8rem;
  }

  .slide-info p {
    font-size: 0.7rem;
  }

  .btn-more {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
