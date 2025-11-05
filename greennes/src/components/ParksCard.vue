<template>
  <div class="category-card">
    <div class="card-header">
      <svg class="card-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
      <h3>Parcs et jardins</h3>
      <p class="subtitle">Emplacements et horaires</p>
    </div>

    <div class="card-content">
      <div class="carousel-wrapper">
        <button v-if="parks.length > 1" @click="prevSlide" class="carousel-btn prev">❮</button>
        
        <div class="carousel-container">
          <div class="carousel-slide" v-if="parks[currentSlide]">
            <img :src="parks[currentSlide].image" :alt="parks[currentSlide].name" />
            <div class="slide-info">
              <h4>{{ parks[currentSlide].name }}</h4>
              <p>{{ parks[currentSlide].distance }}</p>
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
import { ref, onMounted, defineProps, defineEmits } from 'vue'

defineProps({
  location: String
})

defineEmits(['show-map'])

const currentSlide = ref(0)
const parks = ref([
  {
    name: 'Étang des Longs Champs',
    distance: '200m',
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    name: 'Parc des Gayeulles',
    distance: '500m',
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    name: 'Parc de la Préfecture',
    distance: '450m',
    image: '/placeholder.svg?height=200&width=300'
  }
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % parks.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + parks.value.length) % parks.value.length
}

onMounted(() => {
  // Charger les données des parcs depuis l'API
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
</style>
