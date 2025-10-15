<script setup lang="ts"></script>

<template>
  <div>
    <h1>Greennes</h1>
    <p>
      Ce
      <a href="https://vuejs.org/" target="_blank" rel="noopener">lien</a>
      permet de lire la documentation de Vue.js.
    </p>
    <h2>Entrez un emplacement pour commencer votre recherche</h2>

    <!-- About Us button -->
    <router-link to="/about">
      <button style="background-color: #0ea5a4; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; position: fixed; top: 20px; right: 20px;">
        Qui sommes-nous ?
      </button>
    </router-link>
  </div>
</template>
