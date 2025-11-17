<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface AirData {
  temperature: number | null
  humidity: number | null
  pressure: number | null
  pm25: number | null
  pm10: number | null
  o3: number | null
  no2: number | null
  index: number | null
  indexLevel: string | null
}

const translateIndexLevel = (level: string | null): string => {
  if (!level) return "indisponible"

  const map: Record<string, string> = {
    "good": "Bon",
    "moderate": "Modéré",
    "unhealthy-sensitive": "Dégradé",
    "unhealthy": "Mauvais",
    "very-unhealthy": "Très mauvais",
    "hazardous": "Dangereux"
  }

  return map[level] ?? level
}

const loading = ref(true)
const airData = ref<AirData>({
  temperature: null,
  humidity: null,
  pressure: null,
  pm25: null,
  pm10: null,
  o3: null,
  no2: null,
  index: null,
  indexLevel: null
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
        temperature: iaqi.t?.v ?? null,
        humidity: iaqi.h?.v ?? null,
        pressure: iaqi.p?.v ?? null,
        pm25: iaqi.pm25?.v ?? null,
        pm10: iaqi.pm10?.v ?? null,
        o3: iaqi.o3?.v ?? null,
        no2: iaqi.no2?.v ?? null,
        index: data.data.aqi ?? null,
        indexLevel: data.data.aqi ? getIndexLevel(data.data.aqi) : null
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

<template>
  <section class="air-quality-section" id="air-quality">
    <div class="container">
      <h2>Qualité de l'air</h2>

      <!-- Carte principale avec l'indice global -->
      <div class="main-card" :class="{ 'skeleton': loading }">
        <div class="aqi-label" :class="{ 'skeleton-text': loading }">
          {{ loading ? '' : 'Indice global' }}
        </div>
        <div class="aqi-circle" :class="[
          loading ? 'skeleton-circle' : (airData.indexLevel ? `index-${airData.indexLevel}` : '')
        ]">
          <span v-if="!loading" class="aqi-value">
            {{ airData.index !== null ? airData.index : 'N/A' }}
          </span>
        </div>
        <div class="aqi-status" :class="{ 'skeleton-text': loading }">
          {{ loading ? '' : translateIndexLevel(airData.indexLevel) }}
        </div>
      </div>

      <!-- Grille pour les sections détaillées -->
      <div class="quality-grid">
        <!-- Particules atmosphériques -->
        <div class="card" :class="{ 'skeleton': loading }">
          <h3 class="card-title" :class="{ 'skeleton-text': loading }">
            <template v-if="!loading">
              Particules atmosphériques
              <div class="info-tooltip">
                <span class="info-icon">ℹ</span>
                <div class="tooltip-text">Mesure des polluants dans l'air</div>
              </div>
            </template>
          </h3>

          <div class="particule-row" :class="{ 'skeleton-row': loading }">
            <div class="data-content">
              <span class="data-label" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  PM2.5
                  <div class="info-tooltip">
                    <span class="info-icon">ℹ</span>
                    <div class="tooltip-text">Particules fines ≤ 2.5 μm (très dangereuses)</div>
                  </div>
                </template>
              </span>
              <span class="data-value" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  {{ airData.pm25 !== null ? airData.pm25 : 'N/A' }}
                  <span class="data-unit">μg/m³</span>
                </template>
              </span>
            </div>
          </div>

          <div class="particule-row" :class="{ 'skeleton-row': loading }">
            <div class="data-content">
              <span class="data-label" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  PM10
                  <div class="info-tooltip">
                    <span class="info-icon">ℹ</span>
                    <div class="tooltip-text">Particules ≤ 10 μm (inhalables)</div>
                  </div>
                </template>
              </span>
              <span class="data-value" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  {{ airData.pm10 !== null ? airData.pm10 : 'N/A' }}
                  <span class="data-unit">μg/m³</span>
                </template>
              </span>
            </div>
          </div>

          <div class="particule-row" :class="{ 'skeleton-row': loading }">
            <div class="data-content">
              <span class="data-label" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  O3
                  <div class="info-tooltip">
                    <span class="info-icon">ℹ</span>
                    <div class="tooltip-text">Ozone troposphérique (polluant secondaire)</div>
                  </div>
                </template>
              </span>
              <span class="data-value" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  {{ airData.o3 !== null ? airData.o3 : 'N/A' }}
                  <span class="data-unit">μg/m³</span>
                </template>
              </span>
            </div>
          </div>

          <div class="particule-row" :class="{ 'skeleton-row': loading }">
            <div class="data-content">
              <span class="data-label" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  NO2
                  <div class="info-tooltip">
                    <span class="info-icon">ℹ</span>
                    <div class="tooltip-text">Dioxyde d'azote (polluant du trafic)</div>
                  </div>
                </template>
              </span>
              <span class="data-value" :class="{ 'skeleton-text': loading }">
                <template v-if="!loading">
                  {{ airData.no2 !== null ? airData.no2 : 'N/A' }}
                  <span class="data-unit">μg/m³</span>
                </template>
              </span>
            </div>
          </div>
        </div>

        <!-- Données météorologiques -->
        <div class="card" :class="{ 'skeleton': loading }">
          <h3 class="card-title" :class="{ 'skeleton-text': loading }">
            <template v-if="!loading">
              Données météorologiques
              <div class="info-tooltip">
                <span class="info-icon">ℹ</span>
                <div class="tooltip-text">Conditions météo actuelles</div>
              </div>
            </template>
          </h3>

          <div class="data-row" :class="{ 'skeleton-row': loading }">
            <span class="data-label" :class="{ 'skeleton-text': loading }">
              <template v-if="!loading">
                Température
                <div class="info-tooltip">
                  <span class="info-icon">ℹ</span>
                  <div class="tooltip-text">Température actuelle de l'air en degrés Celsius</div>
                </div>
              </template>
            </span>
            <span class="data-value" :class="{ 'skeleton-text': loading }">
              <template v-if="!loading">
                {{ airData.temperature !== null ? airData.temperature : 'N/A' }}
                <span class="data-unit">°C</span>
              </template>
            </span>
          </div>

          <div class="data-row" :class="{ 'skeleton-row': loading }">
            <span class="data-label" :class="{ 'skeleton-text': loading }">
              <template v-if="!loading">
                Humidité relative
                <div class="info-tooltip">
                  <span class="info-icon">ℹ</span>
                  <div class="tooltip-text">Pourcentage d'humidité dans l'air</div>
                </div>
              </template>
            </span>
            <span class="data-value" :class="{ 'skeleton-text': loading }">
              <template v-if="!loading">
                {{ airData.humidity !== null ? airData.humidity : 'N/A' }}
                <span class="data-unit">%</span>
              </template>
            </span>
          </div>

          <div class="data-row" :class="{ 'skeleton-row': loading }">
            <span class="data-label" :class="{ 'skeleton-text': loading }">
              <template v-if="!loading">
                Pression atmosphérique
                <div class="info-tooltip">
                  <span class="info-icon">ℹ</span>
                  <div class="tooltip-text">Pression de l'air en hectopascals</div>
                </div>
              </template>
            </span>
            <span class="data-value" :class="{ 'skeleton-text': loading }">
              <template v-if="!loading">
                {{ airData.pressure !== null ? airData.pressure : 'N/A' }}
                <span class="data-unit">hPa</span>
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.air-quality-section {
  background-color: #FCF3DF;
  padding: 3rem 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

h2 {
  text-align: center;
  color: #2d3748;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

/* Carte principale de l'indice */
.main-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  margin-bottom: 1.5rem;
  text-align: center;
}

.aqi-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 1.5rem;
  transition: all 0.3s ease;
}

.aqi-value {
  font-size: 3.5rem;
  font-weight: bold;
  color: #2d3748;
}

.aqi-label {
  font-size: 1.25rem;
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 0.5rem;
  min-height: 1.75rem;
}

.aqi-status {
  font-size: 1rem;
  color: #718096;
  font-weight: 500;
  min-height: 1.5rem;
}

/* Couleurs de l'indice */
.index-good {
  background: #009E73;
  box-shadow: 0 4px 12px rgba(0, 158, 115, 0.4);
}

.index-good .aqi-value {
  color: white;
}

.index-moderate {
  background: #F0E442;
  box-shadow: 0 4px 12px rgba(240, 228, 66, 0.4);
}

.index-unhealthy-sensitive {
  background: #E69F00;
  box-shadow: 0 4px 12px rgba(230, 159, 0, 0.4);
}

.index-unhealthy {
  background: #D55E00;
  box-shadow: 0 4px 12px rgba(213, 94, 0, 0.4);
}

.index-unhealthy .aqi-value {
  color: white;
}

.index-very-unhealthy {
  background: #CC0033;
  box-shadow: 0 4px 12px rgba(204, 0, 51, 0.4);
}

.index-very-unhealthy .aqi-value {
  color: white;
}

.index-hazardous {
  background: #8E0152;
  box-shadow: 0 4px 12px rgba(142, 1, 82, 0.4);
}

.index-hazardous .aqi-value {
  color: white;
}

/* Grille pour les sections */
.quality-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 1.75rem;
}

/* Éléments de données météo */
.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.data-row:last-child {
  border-bottom: none;
}

.data-label {
  color: #4a5568;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 1.5rem;
}

.data-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  min-height: 1.75rem;
}

.data-unit {
  font-size: 0.9rem;
  color: #718096;
  margin-left: 0.25rem;
}

/* Style pour les particules */
.particule-row {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.particule-row:last-child {
  margin-bottom: 0;
}

.data-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Info tooltips */
.info-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.info-icon {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #718096;
  cursor: help;
  font-style: italic;
  flex-shrink: 0;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  background-color: #1B0808;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  position: absolute;
  z-index: 1000;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  font-size: 0.8rem;
  white-space: normal;
  line-height: 1.4;
  transition: opacity 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1B0808;
}

.info-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Skeleton loading states */
@keyframes skeleton-pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.skeleton-text {
  background: linear-gradient(90deg, #e2e8f0 25%, #cbd5e0 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 4px;
  color: transparent !important;
  user-select: none;
  min-width: 80px;
  display: inline-block;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton-circle {
  background: linear-gradient(90deg, #e2e8f0 25%, #cbd5e0 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.skeleton-row .data-label,
.skeleton-row .data-value {
  min-width: 100px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  h2 {
    font-size: 2rem;
  }

  .quality-grid {
    grid-template-columns: 1fr;
  }

  .aqi-circle {
    width: 120px;
    height: 120px;
  }

  .aqi-value {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .air-quality-section {
    padding: 2rem 0;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .main-card,
  .card {
    padding: 1.25rem;
  }

  .aqi-circle {
    width: 100px;
    height: 100px;
  }

  .aqi-value {
    font-size: 2.5rem;
  }

  .data-label {
    font-size: 0.85rem;
  }

  .data-value {
    font-size: 1.1rem;
  }
}
</style>