import "./App.css";
import "./output.css";
import Login from "./components/Login";
import { useState } from "react";
import Registrar from "./components/Registrar";
import Title from "./components/Title";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  function alterarTela() {
    setIsLogin(!isLogin);
  }

  return (
    <div className="flex justify-center h-screen bg-slate-500 p-6">
      <div>
        <Title>{isLogin ? "Tela de Login" : "Tela de Registro"}</Title>
        {isLogin ? (
          <Login />
        ) : (
          <Registrar />
        )}
        <div>
          <button
            onClick={alterarTela}
            className="text-slate-50 underline hover:text-slate-300"
          >
            {isLogin ? "Não tem conta? Registre-se" : "Já tem um conta? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
