<script setup lang="ts">
import UiCard from '../components/UiCard.vue'
</script>

<template>
  <!-- NavBar -->
  <nav class="navbar">
      <div></div>
      <div class="container">
          <a href="#home-cards" class="nav-link">Accueil</a>
          <a href="#air-quality" class="nav-link">Qualité de l'air</a>
          <a href="#comment" class="nav-link">Commentaires</a>
          <router-link to="/about">
            Qui sommes-nous ?
          </router-link>
      </div>
  </nav>
    
  <!-- Bike, trash and park cards -->
  <section class="bg-dark" id="home-cards">
    <div class="container">
      <div class="section-content animate">
        <h2>Cards</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur lacinia risus vel tristique. Aenean quis scelerisque lacus. Etiam non dui est. Aliquam mollis massa eros, at ultrices turpis tristique volutpat. Nunc eu venenatis sem. Nulla nec sem porta, bibendum risus nec, pulvinar turpis. Ut at varius arcu, et iaculis nisi. Pellentesque scelerisque, est nec tincidunt hendrerit, mi elit ullamcorper elit, id sollicitudin nisl erat eget enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin orci ante, luctus vitae sem at, hendrerit rutrum augue. Curabitur dignissim accumsan lacus, vitae mollis nulla eleifend vitae. Praesent ut velit semper, gravida urna sed, sollicitudin arcu. Duis et sapien semper, suscipit ipsum id, ultrices lorem.</p>
        <p>Curabitur ut malesuada mauris, vitae consequat nisl. Vivamus imperdiet eros non nisl ornare, ut fringilla lectus suscipit. Vestibulum vitae nisi vitae elit rhoncus dignissim et sit amet nunc. Praesent tristique ipsum vitae fringilla rhoncus. Phasellus sagittis in magna id varius. Fusce eget tortor eget lacus auctor pellentesque non a leo. Fusce accumsan lorem ipsum, at suscipit massa commodo sed. Sed a enim eu dui blandit posuere.</p>

        <div class="cards-grid">
          <UiCard title="Stations vélo" subtitle="Localisez les stations près de chez vous" image="/images/bike.jpg" href="#">
            <template #footer>
              <button>Voir</button>
            </template>
          </UiCard>

          <UiCard title="Espaces verts" subtitle="Parcs et jardins" image="/images/park.jpg" href="#">
            <template #footer>
              <button>Explorer</button>
            </template>
          </UiCard>

          <UiCard title="Qualité de l'air" subtitle="Mesures en temps réel" image="/images/air.jpg" href="#air-quality">
            <template #footer>
              <button>Consulter</button>
            </template>
          </UiCard>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Air Quality -->
  <section class="bg-light" id="air-quality">
    <div class="container">
      <div class="section-content animate">
        <h2>Air Quality</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur lacinia risus vel tristique. Aenean quis scelerisque lacus. Etiam non dui est. Aliquam mollis massa eros, at ultrices turpis tristique volutpat. Nunc eu venenatis sem. Nulla nec sem porta, bibendum risus nec, pulvinar turpis. Ut at varius arcu, et iaculis nisi. Pellentesque scelerisque, est nec tincidunt hendrerit, mi elit ullamcorper elit, id sollicitudin nisl erat eget enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin orci ante, luctus vitae sem at, hendrerit rutrum augue. Curabitur dignissim accumsan lacus, vitae mollis nulla eleifend vitae. Praesent ut velit semper, gravida urna sed, sollicitudin arcu. Duis et sapien semper, suscipit ipsum id, ultrices lorem.</p>
        <p>Curabitur ut malesuada mauris, vitae consequat nisl. Vivamus imperdiet eros non nisl ornare, ut fringilla lectus suscipit. Vestibulum vitae nisi vitae elit rhoncus dignissim et sit amet nunc. Praesent tristique ipsum vitae fringilla rhoncus. Phasellus sagittis in magna id varius. Fusce eget tortor eget lacus auctor pellentesque non a leo. Fusce accumsan lorem ipsum, at suscipit massa commodo sed. Sed a enim eu dui blandit posuere.</p>
      </div>
    </div>
  </section>
  
  <!-- Comment -->
  <section class="bg-dark" id="comment">
    <div class="container">
      <div class="section-content animate">
        <h2>Comment</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur lacinia risus vel tristique. Aenean quis scelerisque lacus. Etiam non dui est. Aliquam mollis massa eros, at ultrices turpis tristique volutpat. Nunc eu venenatis sem. Nulla nec sem porta, bibendum risus nec, pulvinar turpis. Ut at varius arcu, et iaculis nisi. Pellentesque scelerisque, est nec tincidunt hendrerit, mi elit ullamcorper elit, id sollicitudin nisl erat eget enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin orci ante, luctus vitae sem at, hendrerit rutrum augue. Curabitur dignissim accumsan lacus, vitae mollis nulla eleifend vitae. Praesent ut velit semper, gravida urna sed, sollicitudin arcu. Duis et sapien semper, suscipit ipsum id, ultrices lorem.</p>
        <p>Curabitur ut malesuada mauris, vitae consequat nisl. Vivamus imperdiet eros non nisl ornare, ut fringilla lectus suscipit. Vestibulum vitae nisi vitae elit rhoncus dignissim et sit amet nunc. Praesent tristique ipsum vitae fringilla rhoncus. Phasellus sagittis in magna id varius. Fusce eget tortor eget lacus auctor pellentesque non a leo. Fusce accumsan lorem ipsum, at suscipit massa commodo sed. Sed a enim eu dui blandit posuere.</p>
        <p>Vivamus in suscipit eros, id molestie urna. Sed eget mi et dolor aliquam porttitor eu eget velit. Curabitur id ipsum quis ante tempus fringilla eu vel nisi. Aliquam rhoncus risus risus, nec dapibus lorem malesuada id. Maecenas imperdiet justo lectus, et mattis risus porttitor ac. Nam tristique at mi laoreet pellentesque. Proin pretium vestibulum eros, sit amet volutpat ex condimentum et. Mauris varius libero quis quam dapibus, a eleifend purus tincidunt.</p>
        <p>Phasellus sodales auctor velit, a vestibulum diam convallis et. Ut sem erat, porta at ornare ut, cursus vitae turpis. Proin posuere massa orci, non sodales sem sagittis quis. Donec imperdiet feugiat augue in aliquam. Mauris blandit augue ligula, id lacinia leo feugiat a. Nunc iaculis diam a enim tincidunt tristique. Morbi lobortis mauris vitae nisi bibendum pharetra. Vestibulum lobortis, purus et euismod sagittis, nulla odio porta purus, ut ultrices enim odio in ligula.</p>
        <p>Sed tellus massa, suscipit nec vehicula at, lacinia aliquet dolor. Aenean faucibus mauris eget accumsan tempor. Sed ac venenatis augue. Ut tristique magna quis libero vestibulum commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent placerat hendrerit semper. Duis id tortor in mauris interdum venenatis. Quisque bibendum diam non egestas fringilla. In eget mauris hendrerit, sodales justo nec, varius urna. Nam bibendum est ac sapien eleifend aliquet. Etiam laoreet est velit, sed faucibus odio porta tempor.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur lacinia risus vel tristique. Aenean quis scelerisque lacus. Etiam non dui est. Aliquam mollis massa eros, at ultrices turpis tristique volutpat. Nunc eu venenatis sem. Nulla nec sem porta, bibendum risus nec, pulvinar turpis. Ut at varius arcu, et iaculis nisi. Pellentesque scelerisque, est nec tincidunt hendrerit, mi elit ullamcorper elit, id sollicitudin nisl erat eget enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin orci ante, luctus vitae sem at, hendrerit rutrum augue. Curabitur dignissim accumsan lacus, vitae mollis nulla eleifend vitae. Praesent ut velit semper, gravida urna sed, sollicitudin arcu. Duis et sapien semper, suscipit ipsum id, ultrices lorem.</p>
        <p>Curabitur ut malesuada mauris, vitae consequat nisl. Vivamus imperdiet eros non nisl ornare, ut fringilla lectus suscipit. Vestibulum vitae nisi vitae elit rhoncus dignissim et sit amet nunc. Praesent tristique ipsum vitae fringilla rhoncus. Phasellus sagittis in magna id varius. Fusce eget tortor eget lacus auctor pellentesque non a leo. Fusce accumsan lorem ipsum, at suscipit massa commodo sed. Sed a enim eu dui blandit posuere.</p>
        <p>Vivamus in suscipit eros, id molestie urna. Sed eget mi et dolor aliquam porttitor eu eget velit. Curabitur id ipsum quis ante tempus fringilla eu vel nisi. Aliquam rhoncus risus risus, nec dapibus lorem malesuada id. Maecenas imperdiet justo lectus, et mattis risus porttitor ac. Nam tristique at mi laoreet pellentesque. Proin pretium vestibulum eros, sit amet volutpat ex condimentum et. Mauris varius libero quis quam dapibus, a eleifend purus tincidunt.</p>
        <p>Phasellus sodales auctor velit, a vestibulum diam convallis et. Ut sem erat, porta at ornare ut, cursus vitae turpis. Proin posuere massa orci, non sodales sem sagittis quis. Donec imperdiet feugiat augue in aliquam. Mauris blandit augue ligula, id lacinia leo feugiat a. Nunc iaculis diam a enim tincidunt tristique. Morbi lobortis mauris vitae nisi bibendum pharetra. Vestibulum lobortis, purus et euismod sagittis, nulla odio porta purus, ut ultrices enim odio in ligula.</p>
        <p>Sed tellus massa, suscipit nec vehicula at, lacinia aliquet dolor. Aenean faucibus mauris eget accumsan tempor. Sed ac venenatis augue. Ut tristique magna quis libero vestibulum commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent placerat hendrerit semper. Duis id tortor in mauris interdum venenatis. Quisque bibendum diam non egestas fringilla. In eget mauris hendrerit, sodales justo nec, varius urna. Nam bibendum est ac sapien eleifend aliquet. Etiam laoreet est velit, sed faucibus odio porta tempor.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur lacinia risus vel tristique. Aenean quis scelerisque lacus. Etiam non dui est. Aliquam mollis massa eros, at ultrices turpis tristique volutpat. Nunc eu venenatis sem. Nulla nec sem porta, bibendum risus nec, pulvinar turpis. Ut at varius arcu, et iaculis nisi. Pellentesque scelerisque, est nec tincidunt hendrerit, mi elit ullamcorper elit, id sollicitudin nisl erat eget enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin orci ante, luctus vitae sem at, hendrerit rutrum augue. Curabitur dignissim accumsan lacus, vitae mollis nulla eleifend vitae. Praesent ut velit semper, gravida urna sed, sollicitudin arcu. Duis et sapien semper, suscipit ipsum id, ultrices lorem.</p>
        <p>Curabitur ut malesuada mauris, vitae consequat nisl. Vivamus imperdiet eros non nisl ornare, ut fringilla lectus suscipit. Vestibulum vitae nisi vitae elit rhoncus dignissim et sit amet nunc. Praesent tristique ipsum vitae fringilla rhoncus. Phasellus sagittis in magna id varius. Fusce eget tortor eget lacus auctor pellentesque non a leo. Fusce accumsan lorem ipsum, at suscipit massa commodo sed. Sed a enim eu dui blandit posuere.</p>
        <p>Vivamus in suscipit eros, id molestie urna. Sed eget mi et dolor aliquam porttitor eu eget velit. Curabitur id ipsum quis ante tempus fringilla eu vel nisi. Aliquam rhoncus risus risus, nec dapibus lorem malesuada id. Maecenas imperdiet justo lectus, et mattis risus porttitor ac. Nam tristique at mi laoreet pellentesque. Proin pretium vestibulum eros, sit amet volutpat ex condimentum et. Mauris varius libero quis quam dapibus, a eleifend purus tincidunt.</p>
        <p>Phasellus sodales auctor velit, a vestibulum diam convallis et. Ut sem erat, porta at ornare ut, cursus vitae turpis. Proin posuere massa orci, non sodales sem sagittis quis. Donec imperdiet feugiat augue in aliquam. Mauris blandit augue ligula, id lacinia leo feugiat a. Nunc iaculis diam a enim tincidunt tristique. Morbi lobortis mauris vitae nisi bibendum pharetra. Vestibulum lobortis, purus et euismod sagittis, nulla odio porta purus, ut ultrices enim odio in ligula.</p>
        <p>Sed tellus massa, suscipit nec vehicula at, lacinia aliquet dolor. Aenean faucibus mauris eget accumsan tempor. Sed ac venenatis augue. Ut tristique magna quis libero vestibulum commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent placerat hendrerit semper. Duis id tortor in mauris interdum venenatis. Quisque bibendum diam non egestas fringilla. In eget mauris hendrerit, sodales justo nec, varius urna. Nam bibendum est ac sapien eleifend aliquet. Etiam laoreet est velit, sed faucibus odio porta tempor.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur lacinia risus vel tristique. Aenean quis scelerisque lacus. Etiam non dui est. Aliquam mollis massa eros, at ultrices turpis tristique volutpat. Nunc eu venenatis sem. Nulla nec sem porta, bibendum risus nec, pulvinar turpis. Ut at varius arcu, et iaculis nisi. Pellentesque scelerisque, est nec tincidunt hendrerit, mi elit ullamcorper elit, id sollicitudin nisl erat eget enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin orci ante, luctus vitae sem at, hendrerit rutrum augue. Curabitur dignissim accumsan lacus, vitae mollis nulla eleifend vitae. Praesent ut velit semper, gravida urna sed, sollicitudin arcu. Duis et sapien semper, suscipit ipsum id, ultrices lorem.</p>
        <p>Curabitur ut malesuada mauris, vitae consequat nisl. Vivamus imperdiet eros non nisl ornare, ut fringilla lectus suscipit. Vestibulum vitae nisi vitae elit rhoncus dignissim et sit amet nunc. Praesent tristique ipsum vitae fringilla rhoncus. Phasellus sagittis in magna id varius. Fusce eget tortor eget lacus auctor pellentesque non a leo. Fusce accumsan lorem ipsum, at suscipit massa commodo sed. Sed a enim eu dui blandit posuere.</p>
        <p>Vivamus in suscipit eros, id molestie urna. Sed eget mi et dolor aliquam porttitor eu eget velit. Curabitur id ipsum quis ante tempus fringilla eu vel nisi. Aliquam rhoncus risus risus, nec dapibus lorem malesuada id. Maecenas imperdiet justo lectus, et mattis risus porttitor ac. Nam tristique at mi laoreet pellentesque. Proin pretium vestibulum eros, sit amet volutpat ex condimentum et. Mauris varius libero quis quam dapibus, a eleifend purus tincidunt.</p>
        <p>Phasellus sodales auctor velit, a vestibulum diam convallis et. Ut sem erat, porta at ornare ut, cursus vitae turpis. Proin posuere massa orci, non sodales sem sagittis quis. Donec imperdiet feugiat augue in aliquam. Mauris blandit augue ligula, id lacinia leo feugiat a. Nunc iaculis diam a enim tincidunt tristique. Morbi lobortis mauris vitae nisi bibendum pharetra. Vestibulum lobortis, purus et euismod sagittis, nulla odio porta purus, ut ultrices enim odio in ligula.</p>
        <p>Sed tellus massa, suscipit nec vehicula at, lacinia aliquet dolor. Aenean faucibus mauris eget accumsan tempor. Sed ac venenatis augue. Ut tristique magna quis libero vestibulum commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent placerat hendrerit semper. Duis id tortor in mauris interdum venenatis. Quisque bibendum diam non egestas fringilla. In eget mauris hendrerit, sodales justo nec, varius urna. Nam bibendum est ac sapien eleifend aliquet. Etiam laoreet est velit, sed faucibus odio porta tempor.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1.25rem}
.cards-grid ui-card{display:block}
.cards-grid button{background:#0ea5a4;color:#fff;border:0;padding:0.45rem 0.8rem;border-radius:6px;cursor:pointer}
</style>
