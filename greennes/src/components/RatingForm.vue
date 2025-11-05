<template>
  <section class="rating-section" id="comment">
    <div class="container">
      <h2>Noter un lieu</h2>
      
      <div class="form-container">
        <p class="form-intro">Vous souhaitez noter un jardin, une station de vélo ou autre ?</p>
        
        <form @submit.prevent="submitRating" class="rating-form">
          <div class="form-group">
            <label for="infrastructure-type">Choisissez le type d'infrastructure :</label>
            <input
              id="infrastructure-type"
              v-model="form.infrastructureType"
              type="text"
              placeholder="Ex: Station de vélo, Parc, etc."
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="location">Choisissez le lieu :</label>
            <input
              id="location"
              v-model="form.location"
              type="text"
              placeholder="Nom du lieu"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="rating">Saisissez la note :</label>
            <div class="rating-stars">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="form.rating = star"
                :class="['star', { filled: star <= form.rating }]"
              >
                ★
              </button>
            </div>
          </div>

          <button type="submit" class="submit-btn">Merci pour votre aide !</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  infrastructureType: '',
  location: '',
  rating: 0
})

const submitRating = () => {
  console.log('Rating submitted:', form.value)
  alert('Merci pour votre avis !')
  form.value = { infrastructureType: '', location: '', rating: 0 }
}
</script>

<style scoped>
.rating-section {
  background-color: white;
  padding: 3rem 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.rating-section h2 {
  text-align: center;
  color: #1B0808;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form-intro {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #FCF3DF;
  border-radius: 12px;
  padding: 2rem;
}

.rating-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #1B0808;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #D4AF8F;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #0EA5A4;
  box-shadow: 0 0 0 3px rgba(14, 165, 164, 0.1);
}

.rating-stars {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.star {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #D4AF8F;
  transition: color 0.2s;
  padding: 0;
}

.star.filled {
  color: #FFC107;
}

.star:hover {
  color: #FFC107;
}

.submit-btn {
  background-color: #D4AF8F;
  color: #1B0808;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #C9A17A;
}
</style>
