<script setup lang="ts">
import { ref, onMounted } from 'vue'

const composts = ref([])
const daBins = ref([])
const loadingComposts = ref(false)
const loadingDA = ref(false)

const fetchComposts = async () => {
  try {
    loadingComposts.value = true
    const res = await fetch('../public/data/composteurs-collectifs.json')
    const arr = await res.json()
    // Log la première entrée pour valider structure
    console.log('COMPOSTS:', arr[0])
    composts.value = arr
  } catch (error) {
    console.error('Erreur chargement composts:', error)
    composts.value = []
  } finally {
    loadingComposts.value = false
  }
}

const fetchDA = async () => {
  try {
    loadingDA.value = true
    const res = await fetch('../public/data/points-apports-volontaire.json')
    const arr = await res.json()
    console.log('DA:', arr[0])
    daBins.value = arr
  } catch (error) {
    console.error('Erreur chargement DA:', error)
    daBins.value = []
  } finally {
    loadingDA.value = false
  }
}

onMounted(() => {
  fetchComposts()
  fetchDA()
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

.loading, .items-list {
  min-height: 80px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item {
  padding: 0.75rem;
  background-color: #F9F9F9;
  border-radius: 8px;
  border-left: 3px solid #D4AF8F;
}

.item-header h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #1B0808;
}

.item-detail {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
  color: #666;
}

.distance {
  color: #0EA5A4;
  font-weight: 600;
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
  .category-card {
    padding: 1rem;
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
}

@media (max-width: 480px) {
  .category-card {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .btn-more {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
