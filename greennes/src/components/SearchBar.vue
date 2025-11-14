<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
import { debounce } from 'lodash'

const searchQuery = ref('')
const selectedLocation = ref('')
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)
const loading = ref(false)
const emit = defineEmits(['location-selected'])

// Rectangle englobant Rennes : sud-ouest (lon1, lat1), nord-est (lon2, lat2)
const RENNES_VIEWBOX = "-1.745,48.070,-1.620,48.153" // (lon1,lat1,lon2,lat2)

const hideSuggestions = () => {
  window.setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// Attente avant complétion, Rennes seulement
const debouncedFetchSuggestions = debounce(async () => {
  if (searchQuery.value.length < 3) {
    suggestions.value = []
    loading.value = false
    return
  }
  loading.value = true
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&limit=5&countrycodes=fr&viewbox=${RENNES_VIEWBOX}&bounded=1&addressdetails=1&extratags=1&namedetails=1`
    )
    const data = await response.json()

    // Construction et dédoublonnage des labels
    const seen = new Set<string>()
    suggestions.value = data
      .map((item: any) => {
        const a = item.address || {}
        const name = item.namedetails?.name

        let mainLabel = ''
        if (name) mainLabel = name
        else if (a.place) mainLabel = a.place
        else if (a.shop) mainLabel = a.shop
        else if (a.public_building) mainLabel = a.public_building

        let streetLabel = ''
        if (a.road) {
          streetLabel = a.road
          if (a.house_number) streetLabel = `${a.house_number} ${streetLabel}`
        }
        let combined = mainLabel.trim()
        if (streetLabel) {
          if (combined) combined += ` – ${streetLabel}`
          else combined = streetLabel
        }
        return combined || item.display_name
      })
      // On retire les doublons
      .filter((label: string) => {
      if (seen.has(label)) return false
      seen.add(label)
      return true
      })

      .slice(0, 5) // Garde le top 5 uniques seulement
  } catch (error) {
    console.error('Erreur chargement suggestions:', error)
    suggestions.value = []
  } finally {
    loading.value = false
  }
}, 400)




// Watch searchQuery for suggested results (debounced)
watch(searchQuery, () => {
  debouncedFetchSuggestions()
})

const selectSuggestion = async (query: string) => {
  searchQuery.value = query
  showSuggestions.value = false
  loading.value = true
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=fr` +
      `&viewbox=${RENNES_VIEWBOX}&bounded=1`
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
  } finally {
    loading.value = false
  }
}

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    await selectSuggestion(searchQuery.value)
  }
}
</script>

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
            placeholder="Rechercher un lieu à Rennes"
            class="search-input"
            @keyup.enter="selectSuggestion(searchQuery)"
            @focus="showSuggestions = true"
            @blur="hideSuggestions"
            autocomplete="off"
          />
          <!-- Loading indicator -->
          <div v-if="loading" class="loading-spinner">Chargement…</div>
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

<style scoped>
.loading-spinner {
  position: absolute;
  right: 16px;
  top: 12px;
  font-size: 0.85rem;
  color: #999;
  z-index: 99;
}
.search-section {
  background-color: #FCF3DF;
  padding: 1.5rem 0;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.search-container { display: flex; gap: 1rem; justify-content: center; align-items: center; flex-wrap: wrap; }
.search-input-wrapper { display: flex; align-items: center; background-color: white; border-radius: 8px; padding: 0.75rem 1rem; flex: 1; max-width: 500px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); position: relative; }
.search-icon { width: 20px; height: 20px; color: #999; margin-right: 0.5rem; flex-shrink: 0; }
.search-input { border: none; outline: none; width: 100%; font-size: 1rem; font-family: 'Inter', sans-serif; }
.suggestions-dropdown { position: absolute; top: 100%; left: 0; right: 0; background-color: white; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px; max-height: 300px; overflow-y: auto; z-index: 100; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.suggestion-item { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; background: none; text-align: left; cursor: pointer; transition: background-color 0.2s; font-size: 0.9rem; color: #333; }
.suggestion-item:hover { background-color: #F5F5F5; }
.location-icon { width: 16px; height: 16px; color: #D4AF8F; flex-shrink: 0; }
.search-button { background-color: #D4AF8F; color: #1B0808; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500; transition: background-color 0.3s; white-space: nowrap; font-size: 1rem; }
.search-button:hover { background-color: #C9A17A; }
.location-info { margin-top: 1rem; text-align: center; font-size: 1rem; color: #333; }
.location-info strong { color: #1B0808; font-weight: 600; }
@media (max-width: 768px) { .search-section { padding: 1rem 0; } .container { padding: 0 0.75rem; } .search-container { gap: 0.75rem; } .search-input-wrapper { max-width: 100%; font-size: 0.95rem; } .search-input { font-size: 0.95rem; } .search-button { padding: 0.75rem 1rem; font-size: 0.95rem; } .location-info { font-size: 0.9rem; margin-top: 0.75rem; } }
@media (max-width: 480px) { .search-section { padding: 0.75rem 0; } .container { padding: 0 0.5rem; } .search-container { flex-direction: column; gap: 0.5rem; } .search-input-wrapper { max-width: 100%; padding: 0.6rem 0.8rem; } .search-icon { width: 18px; height: 18px; margin-right: 0.3rem; } .search-input { font-size: 16px; } .search-button { width: 100%; padding: 0.6rem 1rem; font-size: 0.9rem; } .location-info { font-size: 0.8rem; margin-top: 0.5rem; } }
</style>
