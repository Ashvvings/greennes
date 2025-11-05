<template>
  <div class="search-section">
    <div class="container">
      <div class="search-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un lieu"
            class="search-input"
            @keyup.enter="performSearch"
          />
        </div>
        <button @click="performSearch" class="search-button">Rechercher</button>
      </div>
      
      <div v-if="selectedLocation" class="location-info">
        <p>Voici les différents équipements et lieux à proximité de : <strong>{{ selectedLocation }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const searchQuery = ref('')
const selectedLocation = ref('')
const emit = defineEmits(['location-selected'])

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    selectedLocation.value = searchQuery.value
    emit('location-selected', searchQuery.value)
  }
}
</script>

<style scoped>
.search-section {
  background-color: #FCF3DF;
  padding: 2rem 0;
  margin-top: 5rem;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  flex: 1;
  max-width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
  margin-right: 0.5rem;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
}

.search-button {
  background-color: #D4AF8F;
  color: #1B0808;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #C9A17A;
}

.location-info {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  color: #333;
}

.location-info strong {
  color: #1B0808;
}
</style>
