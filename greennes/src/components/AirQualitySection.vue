<template>
  <section class="air-quality-section" id="air-quality">
    <div class="container">
      <h2>Qualité de l'air</h2>
      
      <div class="quality-content">
        <div v-if="loading" class="loading-state">Chargement des données...</div>
        
        <div v-else class="quality-grid">
          <div class="quality-box">
            <h3>Données météorologiques</h3>
            <div class="data-rows">
              <div class="data-row">
                <span class="label">température :</span>
                <span class="value">{{ airData.temperature }} °C</span>
              </div>
              <div class="data-row">
                <span class="label">humidité relative :</span>
                <span class="value">{{ airData.humidity }} %</span>
              </div>
              <div class="data-row">
                <span class="label">pression atmosphérique :</span>
                <span class="value">{{ airData.pressure }} hPa</span>
              </div>
            </div>
          </div>

          <div class="quality-box">
            <h3>Particules atmosphériques</h3>
            <div class="data-rows">
              <div class="data-row">
                <span class="label">pm2.5° :</span>
                <span class="value">{{ airData.pm25 }} μg/m³</span>
              </div>
              <div class="data-row">
                <span class="label">pm10° :</span>
                <span class="value">{{ airData.pm10 }} μg/m³</span>
              </div>
              <div class="data-row">
                <span class="label">o3 :</span>
                <span class="value">{{ airData.o3 }} μg/m³</span>
              </div>
              <div class="data-row">
                <span class="label">no2 :</span>
                <span class="value">{{ airData.no2 }} μg/m³</span>
              </div>
            </div>
          </div>

          <div class="quality-index">
            <div class="index-label">Indice global</div>
            <div :class="['index-badge', `index-${airData.indexLevel}`]">
              {{ airData.index }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const airData = ref({
  temperature: 17,
  humidity: 72,
  pressure: 1024,
  pm25: 52,
  pm10: 21,
  o3: 29,
  no2: 3.3,
  index: 4,
  indexLevel: 'good'
})

const fetchAirQuality = async () => {
  try {
    loading.value = true
    const response = await fetch(
      'https://api.waqi.info/feed/rennes/?token=65f9c9e6ade05413509068cf513e9787ee6e6b97'
    )
    const data = await response.json()
    
    if (data.data) {
      const iaqi = data.data.iaqi
      airData.value = {
        temperature: data.data.forecast?.daily?.t?.[0]?.avg || 17,
        humidity: iaqi.h?.v || 72,
        pressure: iaqi.p?.v || 1024,
        pm25: iaqi.pm25?.v || 52,
        pm10: iaqi.pm10?.v || 21,
        o3: iaqi.o3?.v || 29,
        no2: iaqi.no2?.v || 3.3,
        index: data.data.aqi,
        indexLevel: getIndexLevel(data.data.aqi)
      }
    }
  } catch (error) {
    console.error('Erreur chargement air:', error)
  } finally {
    loading.value = false
  }
}

const getIndexLevel = (index: number): string => {
  if (index <= 50) return 'good'
  if (index <= 100) return 'moderate'
  if (index <= 150) return 'unhealthy-sensitive'
  if (index <= 200) return 'unhealthy'
  if (index <= 300) return 'very-unhealthy'
  return 'hazardous'
}

onMounted(() => {
  fetchAirQuality()
})
</script>

<style scoped>
.air-quality-section {
  background-color: #FCF3DF;
  padding: 3rem 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.air-quality-section h2 {
  text-align: center;
  color: #1B0808;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.quality-content {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.quality-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.quality-box h3 {
  margin-top: 0;
  color: #1B0808;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.data-rows {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #F0F0F0;
}

.data-row:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  font-weight: 600;
  color: #1B0808;
}

.quality-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.index-label {
  color: #1B0808;
  font-weight: 600;
}

.index-badge {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
}

.index-good {
  background-color: #90EE90;
  color: #1B0808;
}

.index-moderate {
  background-color: #FFFF99;
  color: #1B0808;
}

.index-unhealthy-sensitive {
  background-color: #FFB6C1;
  color: white;
}

.index-unhealthy {
  background-color: #FF6B6B;
  color: white;
}

.index-very-unhealthy {
  background-color: #9933FF;
  color: white;
}

.index-hazardous {
  background-color: #663300;
  color: white;
}

@media (max-width: 768px) {
  .quality-grid {
    grid-template-columns: 1fr;
  }
}
</style>
