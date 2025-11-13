<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-socials">
        <a href="https://www.instagram.com" target="_blank" rel="noopener" class="footer-link">
          <i class="fab fa-instagram"></i> Instagram
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener" class="footer-link">
          <i class="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="mailto:contact@greennes.fr" class="footer-link">
          <i class="fas fa-envelope"></i> contact@greennes.fr
        </a>
      </div>

      <div class="footer-bottom">
        <p>© 2025 Greennes — Tous droits réservés 🌱</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background-color: #E8D5AA;
  color: #1B0808;
  padding: 2rem 1rem;
  margin-top: 4rem;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
}

.footer-socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.footer-link {
  color: #1B0808;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #0EA5A4;
}

.footer-bottom {
  font-size: 0.9rem;
  color: #333;
}

i {
  margin-right: 0.5rem;
}

@media (max-width: 600px) {
  .footer-socials {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
