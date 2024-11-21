import { useState } from "react";
import Input from "./Input";
import Form from "./Form";
import Button from "./Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function Registrar({ registrarConta }) {
    const [email, setEmail] = useState("");
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
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Conta criada com sucesso!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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