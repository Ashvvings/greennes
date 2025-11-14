<template>
  <nav class="navbar">
    <button class="hamburger" @click="isOpen = !isOpen">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </button>

    <div class="nav-links" :class="{ open: isOpen }">
      <router-link :to="{ path: '/' }" class="nav-link" @click="closeMenu">Accueil</router-link>
      <router-link :to="{ path: '/', hash: '#air-quality' }" class="nav-link" @click="closeMenu">Qualité de
        l'air</router-link>
      <router-link :to="{ path: '/', hash: '#comment' }" class="nav-link" @click="closeMenu">Commentaires</router-link>
      <router-link :to="{ path: '/about' }" class="nav-link" @click="closeMenu">Qui sommes-nous ?</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const closeMenu = () => (isOpen.value = false)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #E8D5AA;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
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

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 24px;
  height: 3px;
  background-color: #1B0808;
  transition: 0.3s;
}

.hamburger span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .navbar {
    justify-content: flex-start;
    padding: 0.75rem 1rem;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #E8D5AA;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    display: none;
  }

  .nav-links.open {
    display: flex;
  }
}
</style>
