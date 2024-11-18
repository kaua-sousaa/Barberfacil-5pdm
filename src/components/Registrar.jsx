import { useState } from "react";
import Input from "./Input";
import Form from "./Form";
import Button from "./Button";

function Registrar({registrarConta}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function validarRegistro(){
        if (!email.trim() || !password.trim() || !confirmPassword.trim()){
            alert("Algum campo não foi preenchido")
            return false
        }

        if (password != confirmPassword){
            alert("As senha não coincidem")
            return false
        }

        setEmail("")
        setPassword("")
        setConfirmPassword("")
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

            <Button onClick={() => {
                if(validarRegistro()){
                    registrarConta(email, password)
                }
            }}>Registrar</Button>
        </Form>
    )
}

export default Registrar;