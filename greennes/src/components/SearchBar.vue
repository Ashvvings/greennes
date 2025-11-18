<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
import { debounce } from 'lodash'
import type { Location } from '../types/location'

const props = defineProps<{
  location: Location
}>()

const searchQuery = ref('')
const selectedLocation = ref<Location | null>(null)
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const searchResultsMode = ref(false)
const hasSelectedLocation = ref(false)
const emit = defineEmits<{
  'location-selected': [location: Location]
}>()
const lastSearched = ref('')
const showAutocompleteResults = ref(false)

const RENNES_VIEWBOX = "-1.745,48.070,-1.620,48.153"

const hideSuggestions = () => {
  window.setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const debouncedFetchSuggestions = debounce(async () => {
  if (searchQuery.value.length < 3) {
    suggestions.value = []
    loading.value = false
    return
  }
  loading.value = true
  errorMsg.value = ''
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&limit=10&countrycodes=fr&viewbox=${RENNES_VIEWBOX}&bounded=1&addressdetails=1&extratags=1&namedetails=1`
    )
    const data = await response.json()

    const seen = new Set<string>()
    const uniqueLabels: string[] = []

    data.forEach((item: any) => {
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
        if (combined) combined += ` — ${streetLabel}`
        else combined = streetLabel
      }
      if (!combined) combined = item.display_name

      if (!seen.has(combined)) {
        seen.add(combined)
        uniqueLabels.push(combined)
      }
    })
    suggestions.value = uniqueLabels.slice(0, 5)
  } catch (error) {
    errorMsg.value = "Erreur lors du chargement des suggestions."
    suggestions.value = []
  } finally {
    loading.value = false
  }
}, 400)

watch(searchQuery, () => {
  if (searchResultsMode.value) searchResultsMode.value = false
  debouncedFetchSuggestions()
})

const selectSuggestion = async (query: string) => {
  showSuggestions.value = false
  showAutocompleteResults.value = false
  loading.value = false
  errorMsg.value = ''

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=fr&viewbox=${RENNES_VIEWBOX}&bounded=1`
    )
    const data = await response.json()
    if (data.length > 0) {
      const locationData: Location = {
        name: query,
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      }
      selectedLocation.value = locationData
      hasSelectedLocation.value = true
      searchQuery.value = ''
      emit('location-selected', locationData)
    }
  } catch (error) {
    errorMsg.value = "Impossible de récupérer la localisation sélectionnée."
  }
}

const performSearch = async () => {
  errorMsg.value = ''
  searchResultsMode.value = false
  hasSelectedLocation.value = false
  selectedLocation.value = null
  if (searchQuery.value.trim()) {
    await debouncedFetchSuggestions.flush?.()
    if (!suggestions.value.length) {
      errorMsg.value = "Aucun lieu trouvé pour votre recherche."
      showAutocompleteResults.value = false
    } else {
      searchResultsMode.value = true
      showAutocompleteResults.value = true
      lastSearched.value = searchQuery.value.trim()
    }
  }
}

const selectFromList = (label: string) => {
  selectSuggestion(label)
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
            @keyup.enter="performSearch"
            @input="showSuggestions = true"
            @focus="showSuggestions = true"
            @blur="hideSuggestions"
            autocomplete="off"
          />
          <div v-if="loading && !searchResultsMode && showSuggestions" class="loading-spinner">Chargement…</div>
          <div v-if="showSuggestions && suggestions.length > 0 && !searchResultsMode" class="suggestions-dropdown">
            <button
              v-for="(suggestion, idx) in suggestions"
              :key="idx"
              class="suggestion-item"
              @mousedown.prevent="selectSuggestion(suggestion)"
            >{{ suggestion }}</button>
          </div>
        </div>
        <button @click="performSearch" class="search-button">Rechercher</button>
      </div>
      <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
      <div v-if="searchResultsMode && suggestions.length > 0 && !hasSelectedLocation && !selectedLocation" class="autocomplete-title">
        Sélectionnez un des lieux qui correspondent à : "<strong>{{ lastSearched }}</strong>".
      </div>

      <div v-if="searchResultsMode && suggestions.length > 0 && !hasSelectedLocation && !selectedLocation" class="suggestions-underbar">
        <button
          v-for="(suggestion, idx) in suggestions"
          :key="idx"
          class="suggestion-item"
          @click="selectFromList(suggestion)"
        >{{ suggestion }}</button>
      </div>
      <div v-if="hasSelectedLocation && selectedLocation" class="location-info">
        <p>Voici les différents équipements et lieux à proximité de : <strong>{{ selectedLocation.name }}</strong></p>
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
.error-msg {
  color: #d00;
  margin-top: 0.3rem;
  font-size: 0.95rem;
}
.suggestions-underbar {
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  background: transparent;
  align-items: flex-start;
  padding: 0;
}
.suggestions-underbar .suggestion-item {
  background: #fff;
  border: 1.2px solid #C9A17A;
  color: #000;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  border-radius: 7px;
  margin: 0.08rem 0;
  padding: 0.38rem 0.8rem;
  transition: background 0.13s, color 0.13s, border 0.13s;
  box-shadow: none;
  width: auto;
  min-width: 0;
  max-width: 100%;
  display: block;
}
.suggestions-underbar .suggestion-item:hover {
  background: #C9A17A;
  color: #000;
}
.search-section {
  background-color: #FCF3DF;
  padding: 1.5rem 0;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.search-container { display: flex; gap: 1rem; justify-content: center; align-items: center; flex-wrap: wrap; }
.search-input-wrapper { display: flex; align-items: center; background-color: white; border-radius: 8px; padding: 0.75rem 1rem; flex: 1; min-width: 0; max-width: 500px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); position: relative; }
.search-icon { width: 20px; height: 20px; color: #999; margin-right: 0.5rem; flex-shrink: 0; }
.search-input { border: none; outline: none; width: 100%; font-size: 1rem; font-family: 'Inter', sans-serif; }
.suggestions-dropdown { position: absolute; top: 100%; left: 0; right: 0; background-color: white; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px; max-height: 300px; overflow-y: auto; z-index: 100; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.suggestion-item { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; background: none; text-align: left; cursor: pointer; transition: background-color 0.2s; font-size: 0.9rem; color: #333; }
.suggestion-item:hover { background-color: #F5F5F5; }
.location-icon { width: 16px; height: 16px; color: #D4AF8F; flex-shrink: 0; }
.search-button { background-color: #D4AF8F; color: #1B0808; border: none; padding: 0.75rem 1.25rem; border-radius: 8px; cursor: pointer; font-weight: 500; transition: background-color 0.3s; white-space: nowrap; font-size: 1rem; }
.search-button:hover { background-color: #C9A17A; }
.location-info { margin-top: 1rem; text-align: center; font-size: 1rem; color: #333; }
.location-info strong { color: #1B0808; font-weight: 600; }
.autocomplete-title {
  font-weight: 500;
  margin-bottom: 0.3rem;
  margin-top: 0.5rem;
  color: #2b2633;
  font-size: 1.05rem;
}
@media (max-width: 768px) {
  .search-section { padding: 1rem 0; }
  .container { padding: 0 0.75rem; }
  .search-container { gap: 0.75rem; }
  .search-input-wrapper { max-width: 100%; font-size: 0.95rem; }
  .search-input { font-size: 0.95rem; }
  .search-button { padding: 0.75rem 1rem; font-size: 0.95rem; }
  .location-info { font-size: 0.9rem; margin-top: 0.75rem; }
}
@media (max-width: 480px) {
  .search-section { padding: 0.75rem 0; }
  .container { padding: 0 0.5rem; }
  .search-container { flex-direction: row; gap: 0.5rem; align-items: stretch; }
  .search-input-wrapper { flex: 1; min-width: 0; max-width: none; padding: 0.6rem 0.8rem; }
  .search-icon { width: 18px; height: 18px; margin-right: 0.3rem; }
  .search-input { font-size: 16px; }
  .search-button { padding: 0.6rem 0.9rem; font-size: 0.9rem; flex-shrink: 0; }
  .location-info { font-size: 0.8rem; margin-top: 0.5rem; }
}
</style>