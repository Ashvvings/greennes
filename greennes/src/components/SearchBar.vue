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
  padding: 1.5rem 0;
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
  flex-shrink: 0;
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
  white-space: nowrap;
  font-size: 1rem;
}

.search-button:hover {
  background-color: #C9A17A;
}

.location-info {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  color: #333;
}

.location-info strong {
  color: #1B0808;
  font-weight: 600;
}

/* Improved tablet responsive adjustments */
@media (max-width: 768px) {
  .search-section {
    padding: 1rem 0;
  }

  .container {
    padding: 0 0.75rem;
  }

  .search-container {
    gap: 0.75rem;
  }

  .search-input-wrapper {
    max-width: 100%;
    font-size: 0.95rem;
  }

  .search-input {
    font-size: 0.95rem;
  }

  .search-button {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }

  .location-info {
    font-size: 0.9rem;
    margin-top: 0.75rem;
  }
}

/* Improved mobile responsive adjustments */
@media (max-width: 480px) {
  .search-section {
    padding: 0.75rem 0;
  }

  .container {
    padding: 0 0.5rem;
  }

  .search-container {
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-input-wrapper {
    max-width: 100%;
    padding: 0.6rem 0.8rem;
  }

  .search-icon {
    width: 18px;
    height: 18px;
    margin-right: 0.3rem;
  }

  .search-input {
    font-size: 16px;
  }

  .search-button {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .location-info {
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
}
</style>
