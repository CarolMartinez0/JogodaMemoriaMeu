<template>
  <div id="app">
    <StartScreen 
      v-if="!jogoIniciado" 
      @start-game="startGame" 
    />
    <GameBoard 
      v-else 
      :imagens="imagens" 
      :dificuldade="dificuldade"
      @go-back="voltarMenu"
    />
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue';
import GameBoard from './components/GameBoard.vue';

export default {
  components: { StartScreen, GameBoard },
  data() {
    return {
      jogoIniciado: false,
      dificuldade: 'facil',
      imagens: [
        "/img/ElasTI/1.png",
        "/img/ElasTI/2.png",
        "/img/ElasTI/3.png",
        "/img/ElasTI/4.png",
        "/img/ElasTI/5.png",
        "/img/ElasTI/6.png",
        "/img/ElasTI/7.png",
        "/img/ElasTI/8.png",
        "/img/ElasTI/9.png",
        "/img/ElasTI/10.png",
        "/img/ElasTI/11.png",
        "/img/ElasTI/12.png",
        "/img/ElasTI/13.png",
        "/img/ElasTI/14.png",
        "/img/ElasTI/15.png",
        "/img/ElasTI/16.png",
        "/img/ElasTI/17.png",
        "/img/ElasTI/18.png",
        "/img/ElasTI/19.png",
        "/img/ElasTI/20.png",
      ]
    }
  },
  methods: {
    startGame(level) {
      this.dificuldade = level;
      this.jogoIniciado = true;
    },
    voltarMenu() {
      this.jogoIniciado = false;
    }
  }
};
</script>

<style>
/* ===== Importando a fonte Evogria ===== */
@font-face {
  font-family: 'Evogria';
  src: url('/img/Evogria.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
/* Aplicar a fonte globalmente */
body, #app {
  font-family: 'Evogria', sans-serif;
  margin: 0;
  padding: 0;
}
</style>






