import { useState } from "react";
import Input from "./Input";
import Form from "./Form";
import Button from "./Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

function Registrar({ registrarConta }) {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    function validarRegistro() {
      if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
        alert("Algum campo não foi preenchido");
        return false;
      }
  
      if (password !== confirmPassword) {
        alert("As senhas não coincidem");
        return false;
      }
  
      return true;
    }
  
    async function handleRegister() {
      if (!validarRegistro()) return;
    
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Atualizar o perfil do usuário com o nome de usuário
        await updateProfile(user, {
          displayName: nome, // Supondo que você tenha uma variável "username"
        });
    
        alert("Conta criada com sucesso!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setNome(""); // Resetar o campo de nome de usuário
      } catch (error) {
        alert("Erro ao registrar: " + error.message);
      }
    }
  
    return (
      <Form>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
  
        <Input
          type="password"
          placeholder="Digite uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <Input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
  
        <Button onClick={handleRegister}>Registrar</Button>
      </Form>
    );
  }
  
  export default Registrar;