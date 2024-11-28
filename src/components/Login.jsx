import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Form from "./Form";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function validarInput() {
    if (!email.trim() || !password.trim()) {
      alert("Email ou senha não foram preenchidos");
      return false;
    }
    return true;
  }

  async function handleLogin() {
    if (!validarInput()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      navigate("/home")
      setEmail("");
      setPassword("");   
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  }

  function handleLogout(){
    signOut(auth)
    .then(() => {
      console.log("Usuario deslogado")
      window.location.href = "/"
    })
    .catch((error) => {
      console.log("Erro ao deslogar")
    })
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
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin}>Login</Button>
    </Form>
  );
}

export default Login;
