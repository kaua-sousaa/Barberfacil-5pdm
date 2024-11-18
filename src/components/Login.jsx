import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Form from "./Form";

function Login({validarLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    function validarInput(){
        if (!email.trim() || !password.trim()){
            alert("Email ou senha não foram preenchidos")
            return false
        }
        setEmail("")
        setPassword("")
        return true
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

      <Button onClick={() => {
        if (validarInput()){
            validarLogin(email, password)
        }
      }}>
        Login
      </Button>
    </Form>
  );
}

export default Login;
