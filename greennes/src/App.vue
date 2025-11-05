<template>
  <div id="app">
    <!-- Improved navbar styling for mobile responsiveness -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <span class="brand-icon">🚲</span>
          <span class="brand-text">Grennes</span>
        </div>
        <!-- Added hamburger menu for mobile -->
        <button 
          v-if="isMobile" 
          class="hamburger" 
          @click="menuOpen = !menuOpen"
          :class="{ active: menuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <!-- Mobile menu that appears on toggle -->
        <ul class="nav-menu" v-show="!isMobile || menuOpen">
          <li><router-link to="/" @click="menuOpen = false">Accueil</router-link></li>
          <li><router-link to="/about" @click="menuOpen = false">Qui sommes-nous ?</router-link></li>
        </ul>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const isMobile = ref(window.innerWidth < 768)

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value === false) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.navbar {
  background-color: #e8d5aa;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #1B0808;
  white-space: nowrap;
}

.brand-icon {
  font-size: 1.3rem;
}

.brand-text {
  font-size: 1rem;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #1B0808;
  border-radius: 2px;
  transition: 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  text-decoration: none;
  color: #1B0808;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.nav-menu a:hover {
  color: #8b6f47;
}

.router-link-active {
  color: #8b6f47;
  border-bottom: 2px solid #8b6f47;
  padding-bottom: 0.25rem;
}

/* Tablet responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem 0.75rem;
  }

  .nav-brand {
    font-size: 1rem;
    gap: 0.3rem;
  }

  .brand-icon {
    font-size: 1.1rem;
  }

  .brand-text {
    font-size: 0.9rem;
  }

  .hamburger {
    display: flex;
  }

  /* Mobile menu positioned below navbar */
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background-color: #e8d5aa;
    padding: 0.5rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .nav-menu li {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(27, 8, 8, 0.1);
  }

  .nav-menu li:last-child {
    border-bottom: none;
  }

  .nav-menu a {
    font-size: 0.9rem;
  }
}

/* Mobile responsive */
@media (max-width: 480px) {
  .navbar {
    padding: 0.5rem 0.5rem;
  }

  .nav-brand {
    gap: 0.2rem;
  }

  .brand-icon {
    font-size: 1rem;
  }

  .brand-text {
    font-size: 0.85rem;
  }

  .nav-menu a {
    font-size: 0.85rem;
  }
}
</style>
