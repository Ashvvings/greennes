<template>
  <section class="rating-section" id="comment">
    <div class="container">
      <h2>Noter un lieu</h2>

      <div class="form-container">
        <p class="form-intro">Vous souhaitez noter un jardin, une station de vélo ou autre ?</p>

        <form @submit.prevent="submitRating" class="rating-form">
          <div class="form-group">
            <label for="infrastructure-type">Choisissez le type d'infrastructure :</label>
            <select id="infrastructure-type" v-model="form.infrastructureType" class="form-input">
              <option value="" disabled>-- Sélectionnez --</option>
              <option value="Parc">Parc</option>
              <option value="Station de vélo">Station de vélo</option>
              <option value="Poubelles de déchets alimentaires">Poubelles de déchets alimentaires</option>
            </select>
          </div>


          <div class="form-group">
            <label for="location">Choisissez le lieu :</label>
            <input id="location" v-model="form.location" type="text" placeholder="Nom du lieu" class="form-input" />
          </div>

          <div class="form-group">
            <label for="rating">Saisissez la note :</label>
            <div class="rating-stars">
              <button v-for="star in 5" :key="star" type="button" @click="form.rating = star"
                :class="['star', { filled: star <= form.rating }]">
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
  font-size: 0.95rem;
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
  background: white;
  border: 2px solid #D4AF8F;
  font-size: 2rem;
  cursor: pointer;
  color: #D4AF8F;
  transition: all 0.2s;
  padding: 0.25rem;
  border-radius: 4px;
}

.star.filled {
  background-color: #FFC107;
  color: white;
  border-color: #FFC107;
}

.star:hover {
  background-color: #FFC107;
  color: white;
  border-color: #FFC107;
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

/* Responsive design for tablets and mobile */
@media (max-width: 768px) {
  .rating-section h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .form-intro {
    margin-bottom: 1.5rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .rating-form {
    gap: 1rem;
  }

  .star {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .rating-section {
    padding: 2rem 0;
  }

  .container {
    padding: 0 0.75rem;
  }

  .rating-section h2 {
    font-size: 1.25rem;
  }

  .form-intro {
    font-size: 0.85rem;
  }

  .form-container {
    padding: 1rem;
    border-radius: 8px;
  }

  .form-group label {
    font-size: 0.85rem;
  }

  .form-input {
    font-size: 16px;
    padding: 0.6rem;
  }

  .star {
    font-size: 1.5rem;
    gap: 0.25rem;
  }

  .submit-btn {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
}
</style>
