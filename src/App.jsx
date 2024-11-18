import "./App.css";
import "./output.css";
import Login from "./components/Login";
import { useState } from "react";
import Registrar from "./components/Registrar";

function App() {
  const [isLogin, setIsLogin] = useState(true); // trocar tela de login/registro
  const [account, setAccount] = useState([])

  function alterarTela() {
    setIsLogin(!isLogin);
  }

  function registrarConta(email, password){
    const newAccount = {
      id: account.length +1, 
      email: email,
      password: password
    }
    
    setAccount([...account, newAccount])
    console.log(account)
  }

  function validarLogin(email, password){
      account.map((acc) => {
        if (acc.email == email && acc.password == password){
          console.log("Login feito")
          return true
        }
      })
  }

  return (
    <div className="flex justify-center h-screen bg-slate-500 p-6">
      <div className="">
        <h1 className="text-center text-2xl font-bold text-slate-50 m-2">
          {isLogin ? "Tela de Login" : "Tela de Registro"}
        </h1>
        {isLogin ? (
          <Login alterarTela={alterarTela} validarLogin={validarLogin} />
        ) : (
          <Registrar alterarTela={alterarTela} registrarConta={registrarConta} />
        )}
        <div>
          <button
            onClick={alterarTela}
            className="text-slate-50 underline hover:text-slate-300"
          >
            {isLogin ? "Não tem conta? Registre-se" : "Já tem um conta ? Login"}
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
