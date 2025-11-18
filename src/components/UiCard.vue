<template>
  <article :class="['ui-card', { clickable: !!href }]" @click="onClick" role="article">
    <div v-if="image" class="card-image">
      <img :src="image" :alt="imageAlt || title || 'Card image'" loading="lazy" />
    </div>

    <header class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </slot>
    </header>

    <section class="card-body">
      <slot />
    </section>

    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  href: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void
}>()

const router = useRouter()

const onClick = (e: MouseEvent) => {
  emit('click', e)
  if (!props.href) return
  // open external links in new tab, internal routes with router
  if (/^https?:\/\//.test(props.href)) window.open(props.href, '_blank')
  else router.push(props.href)
}
</script>

<style scoped>
.ui-card{background:#fff;border-radius:10px;padding:1rem;box-shadow:0 6px 14px rgba(0,0,0,0.06);transition:transform .12s ease,box-shadow .12s ease;overflow:hidden}
.ui-card.clickable{cursor:pointer}
.ui-card.clickable:hover{transform:translateY(-6px);box-shadow:0 14px 28px rgba(0,0,0,0.12)}
.card-image img{display:block;width:100%;height:auto;object-fit:cover;border-radius:8px;margin-bottom:0.75rem}
.card-title{margin:0;font-size:1.05rem;font-weight:600;color:#111827}
.card-subtitle{margin:0;font-size:0.9rem;color:#6b7280}
.card-body{margin-top:0.75rem;color:#374151}
.card-footer{margin-top:0.875rem;border-top:1px solid #f3f4f6;padding-top:0.75rem}
</style>
