import { auth } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Registrar usuário
export async function registrarUsuario(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário registrado:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao registrar:", error.message);
    throw error;
  }
}

// Login do usuário
export async function loginUsuario(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login bem-sucedido:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
}

export async function logoutUsuario() {
  try {
    await signOut(auth);
    console.log("Logout realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  }
}