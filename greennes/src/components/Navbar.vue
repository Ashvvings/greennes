<template>
  <nav class="navbar">
    <img src="/src/assets/images/logoV2.png" alt="Logo" class="logo" />
    <button class="hamburger" @click="isOpen = !isOpen">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </button>
    <div class="nav-links" :class="{ open: isOpen }">
      <router-link 
        :to="{ path: '/' }" 
        class="nav-link" 
        :class="{ active: activeSection === 'home' }"
        @click="closeMenu"
      >
        Accueil
      </router-link>
      <router-link 
        :to="{ path: '/', hash: '#air-quality' }" 
        class="nav-link"
        :class="{ active: activeSection === 'air-quality' }"
        @click="closeMenu"
      >
        Qualité de l'air
      </router-link>
      <router-link 
        :to="{ path: '/', hash: '#comment' }" 
        class="nav-link"
        :class="{ active: activeSection === 'comment' }"
        @click="closeMenu"
      >
        Commentaires
      </router-link>
      <router-link 
        :to="{ path: '/about' }" 
        class="nav-link"
        :class="{ active: activeSection === 'about' }"
        @click="closeMenu"
      >
        Qui sommes-nous ?
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const isOpen = ref(false)
const activeSection = ref('home')
const route = useRoute()

const closeMenu = () => (isOpen.value = false)

const handleScroll = () => {
  // Gérer la page About
  if (route.path === '/about') {
    activeSection.value = 'about'
    return
  }

  // Si on n'est pas sur la page d'accueil
  if (route.path !== '/') {
    activeSection.value = ''
    return
  }

  const sections = [
    { id: 'home-cards', name: 'home-cards' },
    { id: 'air-quality', name: 'air-quality' },
    { id: 'comment', name: 'comment' }
  ]

  const scrollPosition = window.scrollY + 150 // offset pour la navbar

  // Si on est tout en haut de la page (avant home-cards)
  if (scrollPosition < 200) {
    activeSection.value = 'home'
    return
  }

  // Trouver quelle section est visible
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i].id)
    if (section) {
      const sectionTop = section.offsetTop
      if (scrollPosition >= sectionTop) {
        activeSection.value = sections[i].name
        return
      }
    }
  }
  
  // Par défaut, on est sur home
  activeSection.value = 'home'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Vérifier la position initiale
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Surveiller les changements de route
watch(() => route.path, () => {
  handleScroll()
})
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

.logo {
  position: absolute;
  left: 1rem;
  height: 40px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #1B0808;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 0.95rem;
  padding-bottom: 0.5rem;
  position: relative;
}

.nav-link:hover {
  color: #0EA5A4;
}

/* Indicateur actif - barre noire en dessous */
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #1B0808;
  border-radius: 2px;
}

/* Alternative : ombre pour effet "bouton enfoncé" */
/* Décommenter si tu préfères cette version */
/*
.nav-link.active {
  background-color: rgba(27, 8, 8, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}
*/

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
  
  .logo {
    left: auto;
    right: 1rem;
    height: 35px;
    max-width: 100px;
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
  
  /* Ajustement de l'indicateur actif pour mobile */
  .nav-link {
    padding-left: 1rem;
  }
  
  .nav-link.active::after {
    left: 0;
    right: auto;
    width: 4px;
    height: 100%;
    top: 0;
    bottom: 0;
  }
}
</style>