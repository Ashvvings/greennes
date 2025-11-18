<script setup lang="ts"></script>

<template>
    <section id="intro" class="intro-section">
        <div class="intro-card">
            <h1 class="title">Bienvenue sur Grennes !</h1>
            <p class="lead">
                Sur notre site, recherchez les infrastructures près de vous. Retrouvez vos stations
                de vélo, composteurs, parcs, etc. préférés. Entrez votre localisation dans la
                barre de recherche pour commencer.
            </p>
        </div>
    </section>
</template>

<style scoped>
#intro.intro-section {
    display: flex;
    justify-content: center;
    padding: 2rem 1rem;
}

.intro-card {
    width: 100%;
    max-width: 1200px;
    background: var(--card-bg, #ffffff);
    color: var(--text, #222);
    border-radius: 12px;
    padding: 1.5rem 2rem;
    box-shadow: var(--card-shadow, 0 6px 18px rgba(0, 0, 0, 0.06));
    border: 1px solid rgba(0, 0, 0, 0.04);
}

.title {
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
    line-height: 1.15;
    font-weight: 700;
}

.lead {
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--muted, #4b5563);
}

@media (max-width: 600px) {
    .intro-card {
        padding: 1rem;
        border-radius: 10px;
    }
    .title {
        font-size: 1.4rem;
    }
}
</style>