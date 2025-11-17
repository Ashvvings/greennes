<template>
  <div class="about-view">
    <div class="about-container">
      <h1>Qui sommes-nous ?</h1>

      <section class="intro-section">
        <h2>À propos du projet Greennes</h2>
        <p>
          Greennes est une application collaborative conçue pour aider les habitant·e·s de Rennes
          à découvrir les équipements et services durables près de leur position : vélos en libre-service,
          espaces verts, et composts communautaires, tout cela à portée de main via une interface intuitive.
          En plus de fournir des informations précises et à jour, Greennes vise à encourager un mode de vie plus
          écologique
          et responsable au sein de la communauté rennaise.
        </p>
      </section>

      <section class="team-section">
        <h2>Notre équipe</h2>
        <div class="team-grid">
          <a href="https://www.linkedin.com/in/alice-caroline-lombard" target="_blank">
            <div class="team-member">
              <img src="../assets/images/alice.png" alt="Image Alice Lombard">
              <div class="member-name">
                <h3>Alice Lombard</h3>
              </div>
              <p class="member-role">Développeuse Fullstack</p>
              <p class="member-bio">Étudiante à l'INSA Rennes</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/axelle-briens-solignac-b84836220/" target="_blank">
            <div class="team-member">
              <img src="../assets/images/axelle.png" alt="Image Axelle Briens-Solignac">
              <div class="member-name">
                <h3>Axelle Briens-Solignac</h3>
              </div>
              <p class="member-role">Développeuse Fullstack</p>
              <p class="member-bio">Étudiante à l'INSA Rennes</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/maud-marchal-bb837b4/" target="_blank">
            <div class="team-member">
              <img src="../assets/images/maud.png" alt="Image Maud Marchal">
              <div class="member-name">
                <h3>Maud Marchal</h3>
              </div>
              <p class="member-role">Encadrante de projet</p>
              <p class="member-bio">Enseignante chercheuse à l'INSA Rennes</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/nicolo-cavalli/" target="_blank">
            <div class="team-member">
              <img src="../assets/images/nicolo.png" alt="Image Nicolo Cavalli">
              <div class="member-name">
                <h3>Nicolo Cavalli</h3>
              </div>
              <p class="member-role">Encadrant de projet</p>
              <p class="member-bio">Doctorant à l'INRIA et intervenant à l'INSA Rennes</p>
            </div>
          </a>
        </div>
      </section>

      <section class="values-section">
        <h2>Nos valeurs</h2>
        <div class="values-list">
          <div class="value-item">
            <h4>🌱 Durabilité</h4>
            <p>Promouvoir les modes de vie écologiques et responsables.</p>
          </div>
          <div class="value-item">
            <h4>🤝 Accessibilité</h4>
            <p>Rendre l'information accessible à tou·te·s les Rennais·e·s.</p>
          </div>
          <div class="value-item">
            <h4>🗺️ Localisation</h4>
            <p>Découvrir les services près de soi facilement.</p>
          </div>
          <div class="value-item">
            <h4>💡 Innovation</h4>
            <p>Utiliser la technologie pour améliorer la vie urbaine.</p>
          </div>
        </div>
      </section>

      <router-link to="/" class="btn-home">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-view {
  background-color: #FCF3DF;
  padding: 2rem 0 0 0;
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

.intro-section h2 {
  margin-top: 0;
}

.intro-section p {
  font-size: 1.05rem;
}

.team-section {
  margin: 3rem 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.team-grid a {
  display: grid;
  text-decoration: none;
  color: inherit;
}

.team-grid a:hover,
.team-grid a:focus,
.team-grid a:active {
  text-decoration: none;
  outline: none;
}

.team-member {
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.team-member img {
  height: 120px;
  width: 120px;
  display: block;
  margin: 0 auto 1rem auto;
  border-radius: 50%;
  object-fit: cover;
}

.team-member h3 {
  margin: 0; /* on centre via le conteneur */
}

.member-name {
  min-height: 2.5em; 
  display: flex;
  align-items: center;   
  justify-content: center;
  margin: 0.5rem 0;
  min-height: 3.5em;
}

.name {
  border-color: #1B0808;
  border-radius: 2%;
  color: #1B0808;
  margin: 0.5rem 0;
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
  grid-template-columns: repeat(4, 1fr);
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
  display: block;
  width: fit-content;
  margin: 1rem auto 0;
  background-color: #D4AF8F;
  color: #1B0808;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
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

@media (max-width: 1024px) {
  .values-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .values-list {
    grid-template-columns: 1fr;
  }
}
</style>
