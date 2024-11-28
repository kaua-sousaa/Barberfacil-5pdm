import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo2.png";
import { logoutUsuario } from "../firebase/auth";

function Sidebar() {
  async function handleLogout() {
    try {
      await logoutUsuario();
      alert("Você foi desconectado!");
      window.location.href = "/";
    } catch (error) {
      alert("Erro ao sair: " + error.message);
    }
  }
  return (
    <div className="flex">
      <nav className="max-w-44  bg-slate-700 p-4 flex flex-col gap-4 text-white">
        <img className="rounded-3xl" src={logo} alt="" />
        <Link
          to="/home"
          className="py-2 px-4 bg-slate-600 rounded hover:bg-slate-500 transition"
        >
          Home
        </Link>
        <Link
          to="select-service"
          className="py-2 px-4 bg-slate-600 rounded hover:bg-slate-500 transition"
        >
          Agendar Serviço
        </Link>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 rounded hover:bg-red-400 transition mt-4"
        >
          Sair
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
