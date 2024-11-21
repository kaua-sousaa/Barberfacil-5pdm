import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importando Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDB05BqsDRsK6UYtqcueUYL8uhwE_dRAoY",
  authDomain: "barberfacil-5pdm.firebaseapp.com",
  projectId: "barberfacil-5pdm",
};

// Verifique se o Firebase já foi inicializado
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializando o Firestore
export const db = getFirestore(app);  // Expondo a instância do Firestore

// Expondo a instância de autenticação
export const auth = getAuth(app);
