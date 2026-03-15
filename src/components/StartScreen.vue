<template>
  <div class="start-screen">
     <h1 class="titulo-texto">Jogo da Memória</h1>
    <!-- Título como imagem -->
    <div class="titulo-container">
      <img src="/img/logo-titulo.png" alt="Logo da StoryGirl" class="titulo-img" />
    </div>

    <p>Escolha a dificuldade:</p>

    <div class="buttons">
      <button @click="start('facil')">Fácil (4 pares)</button>
      <button @click="start('medio')">Médio (7 pares)</button>
      <button @click="start('dificil')">Difícil (10 pares)</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    start(level) {
      this.$emit('start-game', level);
    }
  }
};
</script>

<style>
/* Container principal do menu */
.start-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('/img/menu-fundo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 50px;
  box-sizing: border-box;
}

/* Container do título */
.titulo-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Imagem do título responsiva */
.titulo-img {
  max-width: 40%;
  width: auto;
  height: auto;
  min-width: 200px;
  object-fit: contain;
  display: block;
}

/* Texto do menu */
.start-screen p {
  color: white;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

/* Botões */
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.buttons button {
  margin: 10px;
  padding: 14px 28px;
  font-size: 1.3rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.85);
  transition: all 0.2s;
  font-family: inherit; /* herda Evogria */
}

.buttons button:hover {
  background-color: rgba(255,255,255,1);
  transform: scale(1.05);
}
</style>










