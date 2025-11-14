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
            @keyup.enter="selectSuggestion(searchQuery)"
            @input="fetchSuggestions"
            @focus="showSuggestions = true"
            @blur="hideSuggestions"
            autocomplete="off"
          />
          <!-- Autocomplete suggestions dropdown -->
          <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-dropdown">
            <button
              v-for="(suggestion, idx) in suggestions"
              :key="idx"
              class="suggestion-item"
              @click="selectSuggestion(suggestion)"
            >
              <svg class="location-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              <span>{{ suggestion }}</span>
            </button>
          </div>
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
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)
const emit = defineEmits(['location-selected'])

const hideSuggestions = () => {
  window.setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const fetchSuggestions = async () => {
  if (searchQuery.value.length < 2) {
    suggestions.value = []
    return
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&limit=5&countrycodes=fr`
    )
    const data = await response.json()
    suggestions.value = data.map((item: any) => item.display_name).slice(0, 5)
  } catch (error) {
    console.error('Erreur chargement suggestions:', error)
    suggestions.value = []
  }
}

const selectSuggestion = async (query: string) => {
  searchQuery.value = query
  showSuggestions.value = false

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=fr`
    )
    const data = await response.json()
    
    if (data.length > 0) {
      const result = data[0]
      selectedLocation.value = query
      emit('location-selected', {
        name: query,
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon)
      })
    }
  } catch (error) {
    console.error('Erreur géocodage:', error)
  }
}

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    await selectSuggestion(searchQuery.value)
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
  position: relative;
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

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #E0E0E0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9rem;
  color: #333;
}

.suggestion-item:hover {
  background-color: #F5F5F5;
}

.location-icon {
  width: 16px;
  height: 16px;
  color: #D4AF8F;
  flex-shrink: 0;
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
