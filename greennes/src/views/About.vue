<template>
  <div class="about-view">
    <div class="about-container">
      <h1>Qui sommes-nous ?</h1>
      
      <section class="intro-section">
        <h2>À propos du projet Rennes Location</h2>
        <p>
          Rennes Location est une application collaborative conçue pour aider les habitants de Rennes 
          à découvrir les équipements et services durables près de leur position : vélos en libre-service, 
          espaces verts, composts communitaires, et bien plus.
        </p>
      </section>

      <section class="team-section">
        <h2>Notre équipe</h2>
        <!-- Updated team to only show 2 members -->
        <div class="team-grid">
          <div class="team-member">
            <div class="member-avatar">👤</div>
            <h3>Membre 1</h3>
            <p class="member-role">Développeur Frontend</p>
            <p class="member-bio">Passionné par Vue.js et les interfaces utilisateur</p>
          </div>

          <div class="team-member">
            <div class="member-avatar">👤</div>
            <h3>Membre 2</h3>
            <p class="member-role">Développeur Backend</p>
            <p class="member-bio">Spécialiste des APIs et de l'intégration de données</p>
          </div>
        </div>
      </section>

      <section class="values-section">
        <h2>Nos valeurs</h2>
        <div class="values-list">
          <div class="value-item">
            <h4>🌱 Durabilité</h4>
            <p>Promouvoir les modes de vie écologiques et responsables</p>
          </div>
          <div class="value-item">
            <h4>🤝 Accessibilité</h4>
            <p>Rendre l'information accessible à tous les habitants</p>
          </div>
          <div class="value-item">
            <h4>🗺️ Localisation</h4>
            <p>Découvrir les services près de soi facilement</p>
          </div>
          <div class="value-item">
            <h4>💡 Innovation</h4>
            <p>Utiliser la technologie pour améliorer la vie urbaine</p>
          </div>
        </div>
      </section>

      <router-link to="/" class="btn-home">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page component
</script>

<style scoped>
.about-view {
  background-color: #FCF3DF;
  min-height: 100vh;
  padding: 6rem 0 3rem 0;
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #1B0808;
  margin: 0 0 1rem 0;
  text-align: center;
}

h2 {
  font-size: 1.75rem;
  color: #1B0808;
  margin: 2rem 0 1rem 0;
  border-bottom: 3px solid #D4AF8F;
  padding-bottom: 0.5rem;
}

h3 {
  color: #1B0808;
  margin: 0.5rem 0;
}

h4 {
  color: #1B0808;
  margin: 0 0 0.5rem 0;
}

p {
  color: #333;
  line-height: 1.6;
  margin: 0.5rem 0;
}

.intro-section {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.intro-section p {
  font-size: 1.05rem;
}

.team-section {
  margin: 3rem 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.team-member {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.member-avatar {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.member-role {
  color: #D4AF8F;
  font-weight: 600;
  margin: 0.5rem 0;
}

.member-bio {
  font-size: 0.9rem;
  color: #666;
}

.values-section {
  margin: 3rem 0;
}

.values-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.value-item {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #D4AF8F;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.value-item h4 {
  font-size: 1.1rem;
}

.btn-home {
  display: inline-block;
  background-color: #D4AF8F;
  color: #1B0808;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  margin-top: 2rem;
  text-align: center;
}

.btn-home:hover {
  background-color: #C9A17A;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  .about-container {
    padding: 1rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
