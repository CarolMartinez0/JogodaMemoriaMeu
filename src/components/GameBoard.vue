<template>
  <div class="game-board">
    <!-- Botão voltar -->
    <button class="voltar" @click="$emit('go-back')">Voltar</button>

    <!-- Informações do jogo -->
    <div class="info">
      <p>Jogadas: {{ moves }}</p>
    </div>

    <!-- Grid de cartas -->
    <div class="grid">
      <Card
        v-for="c in cartas"
        :key="c.id"
        :carta="c"
        @click="virarCarta(c)"
      />
    </div>

    <!-- Tela de vitória -->
    <div v-if="venceu" class="victory">
      <h2>🎉 Parabéns! Você venceu!</h2>
      <p>Jogadas: {{ moves }}</p>
      <p>Pontuação: {{ pontuacao }}</p>
     <button class="voltar" @click="startGame">Jogar novamente</button>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: { Card },
  props: ["imagens", "dificuldade"],

 data() {
  return {
    cartas: [],
    selecionadas: [],
    moves: 0,
    venceu: false,
    pontuacao: 0,
    travado: false // <-- impede cliques rápidos
  };
},

  created() {
    this.startGame();
  },

  methods: {
    startGame() {
      this.moves = 0;
      this.venceu = false;
      this.pontuacao = 0;
      this.selecionadas = [];

      let numPares = 4;
      if (this.dificuldade === "medio") numPares = 7;
      if (this.dificuldade === "dificil") numPares = 10;

      // Criar pares corretos: [pessoa, texto]
      const todosPares = [];
      for (let i = 0; i < this.imagens.length; i += 2) {
        todosPares.push([this.imagens[i], this.imagens[i + 1]]);
      }

      // Verificar se tem pares suficientes
      if (todosPares.length < numPares) {
        alert("Não há pares suficientes!");
        return;
      }

      // Escolher pares aleatórios
      const paresEscolhidos = todosPares
        .sort(() => Math.random() - 0.5)
        .slice(0, numPares);

      // Criar cartas
      let cartas = [];
      let valor = 1;

      paresEscolhidos.forEach(par => {
        const [pessoa, texto] = par;

        cartas.push({
          id: cartas.length,
          imagem: pessoa,
          virada: false,
          encontrada: false,
          valor
        });

        cartas.push({
          id: cartas.length,
          imagem: texto,
          virada: false,
          encontrada: false,
          valor
        });

        valor++;
      });

      // Embaralhar cartas
      this.cartas = cartas.sort(() => Math.random() - 0.5);
    },

 virarCarta(carta) {
  if (this.travado) return;              // 🔒 evita cliques enquanto espera
  if (carta.virada || carta.encontrada) return;
  if (this.selecionadas.length === 2) return;

  carta.virada = true;
  this.selecionadas.push(carta);

  if (this.selecionadas.length === 2) {
    this.moves++; 
    this.travado = true;                 // 🔒 trava o jogo
    setTimeout(() => this.verificarPar(), 900); // Delay maior p/ celular
  }
},


   verificarPar() {
  const [c1, c2] = this.selecionadas;

  if (c1.valor === c2.valor) {
    c1.encontrada = true;
    c2.encontrada = true;
  } else {
    c1.virada = false;
    c2.virada = false;
  }

  this.selecionadas = [];
  this.travado = false;  // 🔓 destrava o jogo

  if (this.cartas.every(c => c.encontrada)) {
    this.vitoria();
  }
},

    vitoria() {
      this.venceu = true;

      // Fórmula simples de pontuação
      // Quanto menos jogadas, mais pontos
      this.pontuacao = Math.max(1000 - this.moves * 20, 0);
    }
  }
};
</script>

<style>
.game-board {
  width: 100%;
  min-height: 100vh;

  background-image: 
    linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
    url('/img/menu-fundo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  margin: 0 auto;
}

/* Informações */
.info {
  font-size: 1.5rem;
  margin: 10px;
  color: white;
  text-align: center;
}

/* CELULAR — cartas pequenas */
.grid {
  display: grid;
  justify-items: center; /* centraliza cada carta */
  width: 100%;
  max-width: 1200px;     /* evita esticar demais */
  margin: 0 auto;

  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 14px;
  padding: 10px;
}

/* TELAS MÉDIAS (tablets) */
@media (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }
}

/* COMPUTADOR — cartas maiores */
@media (min-width: 1000px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
}

/* Tela de vitória */
.victory {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

/* Botão voltar */
.voltar {
  margin: 10px;
  padding: 12px 24px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(255,255,255,0.85);
  transition: all 0.2s;
  font-family: inherit;
  color:#050125;
}

.voltar:hover {
  background-color: rgba(255,255,255,1);
  transform: scale(1.05);
}
</style>










