<script setup lang="ts"></script>

<template>
  <div class="about-page">
    <h1>Qui sommes-nous ?</h1>

    <div class="team-photo-wrapper">
      <img src="../assets/images/Axelle.png" alt="Axelle" class="team-photo" />
      <img src="../assets/images/Alice.png" alt="Alice" class="team-photo" />
    </div>

    <p>
        Nous sommes Axelle Briens-Solignac et Alice Lombard, étudiantes en 5ème année à l'INSA de Rennes. <br />
        Ce projet a été réalisé dans le cadre du cours d'IHM durant l'année universitaire 2025-2026.
    </p>

    <router-link to="/">
      <button>Retour à la page d'accueil</button>
    </router-link>
  </div>
</template>

<style scoped>
.about-page{text-align:center}
.team-photo-wrapper{display:flex;justify-content:center;margin:1rem 0; gap:1rem;flex-wrap:wrap}
.team-photo{max-width:320px;width:100%;height:auto;border-radius:8px;object-fit:cover;box-shadow:0 6px 18px rgba(0,0,0,0.12)}
button{margin-top:1rem;padding:0.5rem 1rem;border-radius:6px;border:0;background:#0ea5a4;color:#fff;cursor:pointer}
</style>
