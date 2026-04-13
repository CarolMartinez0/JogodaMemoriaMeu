<template>
  <div class="start-screen">
    <div class="login-box">
      <h2 class="titulo-texto">Identifique-se para jogar!</h2>
      
      <form @submit.prevent="handleLogin">
        
        <input 
          v-model="nickname" 
          placeholder="Seu nome ou apelido" 
          type="text"
          required 
        />

        <input 
          v-model="escola" 
          placeholder="Nome da sua escola" 
          type="text"
          required 
        />

        <div class="buttons">
          <button 
            type="submit" 
            :disabled="loading || !nickname.trim() || !escola.trim()"
            :class="{ 'botao-bloqueado': loading || !nickname.trim() || !escola.trim() }"
          >
            {{ loading ? 'Entrando...' : 'Entrar no Jogo' }}
          </button>
        </div>
        
        <p v-if="!nickname.trim() || !escola.trim()" class="aviso">
          Preencha todos os campos
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { auth, db } from '../../firebase.js'; 
import { signInAnonymously, setPersistence, browserSessionPersistence } from 'firebase/auth';
// 1. ADICIONE O 'query', 'where', 'collection' e 'getDocs' AQUI:
import { doc, setDoc, query, where, collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Para o aviso ficar bonito em rosa

const nickname = ref('');
const escola = ref('');
const loading = ref(false);
const emit = defineEmits(['login-sucesso']);

const handleLogin = async () => {
  if (!nickname.value.trim() || !escola.value.trim()) return;

  loading.value = true;
  try {
    // --- PARTE NOVA: VERIFICAÇÃO DE DUPLICIDADE ---
    const q = query(
      collection(db, "jogadores"), 
      where("nome", "==", nickname.value),
      where("escola", "==", escola.value)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Se encontrou alguém, exibe o aviso e para o código aqui
      Swal.fire({
        title: 'Nome já em uso!',
        text: `Já existe um(a) ${nickname.value} na escola ${escola.value}. Tente usar um sobrenome ou apelido!`,
        icon: 'warning',
        confirmButtonColor: '#ff69b4',
        background: '#fff',
        color: '#ff69b4'
      });
      loading.value = false;
      return; // O return impede que o código abaixo seja executado
    }
    // --- FIM DA PARTE NOVA ---

    //await auth.setPersistence(browserSessionPersistence);
    const result = await signInAnonymously(auth);
    
    await setDoc(doc(db, "jogadores", result.user.uid), {
      nome: nickname.value,
      escola: escola.value,
      dataCriacao: new Date()
    });

    emit('login-sucesso', { 
  nome: nickname.value, 
  escola: escola.value 
});

    emit('login-sucesso');
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Copiando exatamente o fundo do Starscreen */
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
  font-family: 'Evogria', sans-serif;
}

.titulo-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.titulo-img {
  max-width: 30%;
  min-width: 180px;
  object-fit: contain;
}

.titulo-texto {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-family: 'Evogria', sans-serif;
}

/* Estilização da caixa de login inspirada na seção de recordes */
.login-box {
  /* Usando RGBA para manter a transparência que você já tinha, mas com tom rosa */
 background-color: rgba(255,181,192,0.9);
  
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
  
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ff69b4;
  border-radius: 8px;
  font-family: Arial, sans-serif; /* Input costuma ser melhor com fontes sem serifa comum */
  box-sizing: border-box;
}

/* Botão seguindo o estilo do jogo */
.buttons button {
  width: 100%;
  margin: 10px 0;
  padding: 14px;
  font-size: 1.3rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: #ff69b4;
  color: white;
  transition: all 0.2s;
  font-family: 'Evogria', sans-serif;
}

.buttons button:hover {
  background-color: #ff1493;
  transform: scale(1.05);
}

.error-msg {
  color: #ff1493;
  font-weight: bold;
  margin-top: 10px;
}
</style>