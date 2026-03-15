<template>
  <div class="card" :class="{ flipped: carta.virada || carta.encontrada }" @click="$emit('click')">
    <div class="front">
      <img :src="carta.imagem" alt="Carta" />
    </div>
    <div class="back">?</div>
  </div>
</template>

<script>
export default {
  props: ["carta"]
};
</script>

<style scoped>
.card {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  perspective: 800px; /* Aumentei – melhora animação no celular */
}

.card .front, 
.card .back {
  width: 100%;
  height: 100%;
  position: absolute;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* NECESSÁRIO para Android/iPhone */

  transform-style: preserve-3d; /* Melhora consistência */
  will-change: transform; /* Otimiza para celular */

  transition: transform 0.6s ease;  /* Aumentei o tempo da virada */
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.card .front {
  transform: rotateY(180deg);
}

.card .back {
  background: #050125;
  font-size: 3rem;
}

.card.flipped .front {
  transform: rotateY(0);
}

.card.flipped .back {
  transform: rotateY(180deg);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  will-change: transform; /* Suaviza animação de imagem */
}
</style>













