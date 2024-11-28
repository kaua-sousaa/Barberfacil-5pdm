import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";

function Home() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchAgendamentos(currentUser);
      } else {
        console.warn("Usuário não autenticado.");
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAgendamentos = async (currentUser) => {
    try {
      const q = query(
        collection(db, "payments"),
        where("cliente.id", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const agendamentosList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => a.date.seconds - b.date.seconds); // Ordena por data (timestamp)
  
      setAgendamentos(agendamentosList);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  const proximoAgendamento = agendamentos[0];

  return (
    <div className="flex flex-col items-center p-6 bg-slate-500 min-h-screen">
      <Title>Bem-vindo(a), {user?.displayName || "Usuário"}!</Title>
      <div className="bg-slate-700 p-4 rounded-md">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-3">
          <h2 className="text-lg font-semibold mb-2">Próximo Agendamento</h2>
          {proximoAgendamento ? (
            <div>
              <p>
                Data:{" "}
                {new Date(
                  proximoAgendamento.date.seconds * 1000
                ).toLocaleDateString("pt-BR")}
              </p>
              <p>
                Serviço(s):{" "}
                {proximoAgendamento.services
                  .map((service) => service.nome)
                  .join(", ")}
              </p>
            </div>
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </div>

        <div className="mt-4 text-slate-50 text-center">
          <h2>Total de Agendamentos: {agendamentos.length}</h2>
        </div>

        <div className="flex gap-4 mt-6 justify-center">
          <Button onClick={() => navigate("/select-service")}>
            Agendar Serviço
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>Histórico</Button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                Histórico de Agendamentos
              </h2>
              {agendamentos.length > 0 ? (
                <ul className="space-y-4">
                  {agendamentos.map((agendamento) => (
                    <li
                      key={agendamento.id}
                      className={`p-4 rounded-lg shadow ${
                        status === "aberto" ? "bg-yellow-100" : "bg-gray-100"
                      }`}
                    >
                      <p>
                        <strong>Data:</strong>{" "}
                        {new Date(
                          agendamento.date.seconds * 1000
                        ).toLocaleDateString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </p>
                      <p>
                        <strong>Serviços:</strong>{" "}
                        {agendamento.services
                          .map((service) => service.nome)
                          .join(", ")}
                      </p>
                      <p>
                        <strong>Total: </strong>{" "}
                        {agendamento.services.reduce((total, service) =>
                        total + service.preco, 0)
                        } 
                        {console.log(agendamento)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum agendamento encontrado.</p>
              )}
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
