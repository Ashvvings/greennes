<template>
    <nav class="navbar">
        <div></div>
        <div class="nav-center">
            <router-link :to="{ path: '/' }" class="nav-link">Accueil</router-link>
            <router-link :to="{ path: '/', hash: '#air-quality' }" class="nav-link">Qualité de l'air</router-link>
            <router-link :to="{ path: '/', hash: '#comment' }" class="nav-link">Commentaires</router-link>
            <router-link :to="{ path: '/about' }" class="nav-link">Qui sommes-nous ?</router-link>
        </div>
        <div></div>
    </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #E8D5AA;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.nav-center {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.nav-link {
  color: #1B0808;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: #0EA5A4;
}

@media (max-width: 768px) {
  .navbar {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .nav-center {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
}
</style>
