<template>
  <div id="app">
    <Navbar /> 
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
html, body, #app {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background: #FCF3DF;
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view, .home-view {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
}
</style>
