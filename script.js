import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function salvarResultado(nomeDaCrianca, pontuacaoFinal) {
  try {
    const docRef = await addDoc(collection(db, "ranking"), {
      nome: nomeDaCrianca,
      pontos: pontuacaoFinal,
      data: serverTimestamp() // Salva o horário exato automaticamente
    });
    console.log("Pontuação salva! ID do documento:", docRef.id);
    alert("Sua pontuação foi salva no ranking!");
  } catch (e) {
    console.error("Erro ao salvar no banco de dados: ", e);
  }
}