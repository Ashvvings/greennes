<template>
  <div class="category-card">
    <div class="card-header">
      <FontAwesomeIcon :icon="['fas', 'tree']" class="card-icon" />
      <div class="header-content">
        <h3>Parcs et jardins</h3>
        <p class="subtitle">Emplacements et horaires</p>
      </div>
    </div>

    <div class="card-content">
      <div class="carousel-wrapper">
        <button 
          v-if="displayedParks.length > 0" 
          @click="scrollPrev" 
          class="carousel-btn prev" 
          aria-label="Parcs précédents"
          :disabled="isAtStart"
        >
          ❮
        </button>
        
        <div class="carousel-container" ref="carouselContainer">
          <div class="carousel-track">
            <div 
              v-for="(park, index) in displayedParks" 
              :key="index"
              class="carousel-card"
            >
              <img 
                :src="park.image" 
                :alt="park.name" 
                loading="lazy"
              />
              <div class="card-overlay">
                <h4>{{ park.name }}</h4>
                <p v-if="park.formattedDistance" class="distance">
                  {{ park.formattedDistance }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          v-if="displayedParks.length > 0" 
          @click="scrollNext" 
          class="carousel-btn next" 
          aria-label="Parcs suivants"
          :disabled="isAtEnd"
        >
          ❯
        </button>
      </div>

      <div v-if="displayedParks.length > 1" class="carousel-indicators">
        <div 
          v-for="index in Math.ceil(displayedParks.length / 2)" 
          :key="index"
          :class="['indicator', { active: currentPage === index - 1 }]"
        ></div>
      </div>
    </div>

    <button @click="$emit('show-map')" class="btn-more">Voir plus</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Park {
  name: string
  lat: number
  lon: number
  image: string
  distance?: number
  formattedDistance?: string
}

interface Location {
  lat: number
  lon: number
}

const props = defineProps<{
  location: Location
}>()

const emit = defineEmits(['show-map'])

// Liste complète des parcs rennais
const allParks = ref<Park[]>([
  {name: "Parc des Gayeulles", lat: 48.1300, lon: -1.6400, image: "/src/assets/images/gayeulles.png"},
  {name: "Parc du Thabor", lat: 48.1144, lon: -1.6669, image: "/src/assets/images/thabor.png"},
  {name: "Prairies Saint-Martin", lat: 48.1180, lon: -1.6720, image: "/src/assets/images/saint_martin.png"},
  {name: "Parc de Bréquigny", lat: 48.0900, lon: -1.6790, image: "/src/assets/images/brequigny.png"},
  {name: "Coulée verte", lat: 48.1250, lon: -1.6480, image: "/src/assets/images/coulee_verte.png"},
  {name: "Parc Oberthür", lat: 48.1128, lon: -1.6594, image: "/src/assets/images/oberthur.png"},
  {name: "Parc du Landry", lat: 48.0910, lon: -1.6470, image: "/src/assets/images/landry.png"},
  {name: "Parc de Maurepas", lat: 48.1210, lon: -1.6460, image: "/src/assets/images/maurepas.png"},
  {name: "Parc de Beauregard", lat: 48.1260, lon: -1.7020, image: "/src/assets/images/beauregard.png"},
  {name: "Parc de Villejean", lat: 48.1190, lon: -1.7000, image: "/src/assets/images/villejean.png"},
  {name: "Jardin Saint-Georges", lat: 48.1100, lon: -1.6780, image: "/src/assets/images/saint_georges.png"},
  {name: "Jardin chinois du parc de Maurepas", lat: 48.1200, lon: -1.6460, image: "/src/assets/images/jardin_chinois_maurepas.png"},
  {name: "Jardin de la Confluence", lat: 48.1100, lon: -1.6830, image: "/src/assets/images/confluence.png"},
  {name: "Plages de Baud", lat: 48.1120, lon: -1.6670, image: "/src/assets/images/baud.png"},
])

const carouselContainer = ref<HTMLElement | null>(null)
const currentPage = ref(0)
const isAtStart = ref(true)
const isAtEnd = ref(false)

// Fonction de calcul de distance (formule de Haversine)
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

// Formater la distance
const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`
  }
  return `${km.toFixed(1)}km`
}

// Calcul des 5 parcs les plus proches
const displayedParks = computed(() => {
  const parksWithDistance = allParks.value.map(park => ({
    ...park,
    distance: calculateDistance(props.location.lat, props.location.lon, park.lat, park.lon),
    formattedDistance: formatDistance(
      calculateDistance(props.location.lat, props.location.lon, park.lat, park.lon)
    )
  }))
  
  return parksWithDistance
    .sort((a, b) => a.distance! - b.distance!)
    .slice(0, 5)
})

const updateScrollButtons = () => {
  if (!carouselContainer.value) return
  
  const container = carouselContainer.value
  isAtStart.value = container.scrollLeft <= 10
  isAtEnd.value = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10
  
  // Calculer la page actuelle
  const cardWidth = container.clientWidth / 2.2
  currentPage.value = Math.round(container.scrollLeft / (cardWidth * 2))
}

const scrollNext = () => {
  if (!carouselContainer.value) return
  const cardWidth = carouselContainer.value.clientWidth / 2.2
  carouselContainer.value.scrollBy({ left: cardWidth * 2, behavior: 'smooth' })
}

const scrollPrev = () => {
  if (!carouselContainer.value) return
  const cardWidth = carouselContainer.value.clientWidth / 2.2
  carouselContainer.value.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' })
}

onMounted(() => {
  if (carouselContainer.value) {
    carouselContainer.value.addEventListener('scroll', updateScrollButtons)
    updateScrollButtons()
  }
})

onUnmounted(() => {
  if (carouselContainer.value) {
    carouselContainer.value.removeEventListener('scroll', updateScrollButtons)
  }
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
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  color: #666;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-container {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  min-width: 0;
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.carousel-track {
  display: flex;
  gap: 1rem;
}

.carousel-card {
  flex: 0 0 calc((100% - 1rem) / 1.2);
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease;
}

.carousel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.3));
  color: white;
  padding: 1.25rem;
  border-radius: 0 0 12px 12px;
}

.card-overlay h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.distance {
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  opacity: 0.95;
  color: #0EA5A4;
  font-weight: 600;
}

.carousel-btn {
  background-color: #D4AF8F;
  color: #1B0808;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.carousel-btn:hover:not(:disabled) {
  background-color: #C9A17A;
  transform: scale(1.05);
}

.carousel-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.carousel-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #E0E0E0;
  transition: all 0.2s ease;
}

.indicator.active {
  background-color: #D4AF8F;
  width: 24px;
  border-radius: 4px;
}

.btn-more {
  background-color: #D4AF8F;
  color: #1B0808;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  align-self: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-more:hover {
  background-color: #C9A17A;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-more:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .carousel-wrapper {
    gap: 0.75rem;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .carousel-card {
    height: 200px;
  }

  .card-overlay {
    padding: 1rem;
  }

  .card-overlay h4 {
    font-size: 1rem;
  }

  .distance {
    font-size: 0.85rem;
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
    font-size: 1.1rem;
  }

  .subtitle {
    font-size: 0.85rem;
  }

  .carousel-wrapper {
    gap: 0.5rem;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .carousel-card {
    flex: 0 0 calc((100% - 0.5rem) / 1.5);
    height: 180px;
  }

  .card-overlay {
    padding: 0.75rem;
  }

  .card-overlay h4 {
    font-size: 0.95rem;
  }

  .distance {
    font-size: 0.8rem;
  }

  .btn-more {
    padding: 0.65rem 1.25rem;
    font-size: 0.9rem;
  }

  .indicator {
    width: 6px;
    height: 6px;
  }

  .indicator.active {
    width: 20px;
  }
}
</style>