<template>
  <div id="app">
    <div v-if="carregando" class="start-screen">
      <div class="records">
         <p>Verificando autenticação...</p>
      </div>
    </div>

    <Login v-else-if="!usuarioLogado" @login-sucesso="onLoginSucesso" />

    <template v-else>
      <transition name="page" mode="out-in">
        
        <StorySlideshow 
          v-if="exibindoIntro" 
          @close-intro="exibindoIntro = false" 
          key="slideshow" 
        />

        <Ranking 
          v-else-if="exibindoRanking" 
          @go-back="voltarMenu" 
          key="ranking" 
        />

        <StartScreen 
          v-else-if="!jogoIniciado" 
          @start-game="startGame" 
          @open-intro="exibindoIntro = true" 
          @ver-ranking="abrirRanking"
          key="start" 
        />

        <GameBoard 
          v-else 
          :imagens="imagens" 
          :dificuldade="dificuldade" 
          :nomeUsuario="usuarioDados.nome" 
          :escolaUsuario="usuarioDados.escola"
          @go-back="voltarMenu" 
          @ver-ranking="abrirRanking"
          key="game" 
        />

      </transition>
    </template>
  </div>
</template>

<script>
import Ranking from './components/Ranking.vue';
import StartScreen from './components/StartScreen.vue';
import GameBoard from './components/GameBoard.vue';
import StorySlideshow from './components/StorySlideshow.vue';
import Login from './components/Login.vue';
//import { logEvent } from "firebase/analytics";
//import { analytics } from "../firebase.js";
import { auth, db } from '../firebase.js'; 
import { doc, getDoc } from 'firebase/firestore';

export default {
  components: { 
    StartScreen, 
    GameBoard, 
    StorySlideshow, 
    Login, 
    Ranking 
  },
  data() {
    return {
      carregando: true,
      usuarioLogado: false,
      exibindoIntro: false,
      jogoIniciado: false,
      exibindoRanking: false,
      dificuldade: 'facil',
      usuarioDados: {
        nome: '',
        escola: ''
      },
      imagens: [
        "/img/ElasTI/1.png", "/img/ElasTI/2.png", "/img/ElasTI/3.png", "/img/ElasTI/4.png",
        "/img/ElasTI/5.png", "/img/ElasTI/6.png", "/img/ElasTI/7.png", "/img/ElasTI/8.png",
        "/img/ElasTI/9.png", "/img/ElasTI/10.png", "/img/ElasTI/11.png", "/img/ElasTI/12.png",
        "/img/ElasTI/13.png", "/img/ElasTI/14.png", "/img/ElasTI/15.png", "/img/ElasTI/16.png",
        "/img/ElasTI/17.png", "/img/ElasTI/18.png", "/img/ElasTI/19.png", "/img/ElasTI/20.png",
      ]
    }
  },
  async created() {
    this.carregando = true;
    
    try {
      // Força logout ao carregar para garantir novo login sempre
      await auth.signOut();
    } catch (error) {
      console.error("Erro ao deslogar no início:", error);
    }

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "jogadores", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.usuarioDados = docSnap.data();
            this.usuarioLogado = true;
          }
        } catch (error) {
          console.error("Erro no Firestore:", error);
        }
      } else {
        this.usuarioLogado = false;
      }
      this.carregando = false; 
    });
  },
  methods: {
    onLoginSucesso(dados) {
      this.usuarioDados = dados;
      this.usuarioLogado = true;
    },
    startGame(level) {
      this.dificuldade = level;
      this.jogoIniciado = true;
      this.exibindoRanking = false;
      this.exibindoIntro = false;
    },
    voltarMenu() {
      this.jogoIniciado = false;
      this.exibindoRanking = false;
      this.exibindoIntro = false;
    },
    abrirRanking() {
      this.exibindoRanking = true;
      this.jogoIniciado = false;
      this.exibindoIntro = false;
    },
    async sairDaConta() {
      await auth.signOut();
      this.usuarioLogado = false;
      this.usuarioDados = { nome: '', escola: '' };
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

body, #app {
  font-family: 'Evogria', sans-serif;
  margin: 0;
  padding: 0;
}

/* Transições de página */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>



