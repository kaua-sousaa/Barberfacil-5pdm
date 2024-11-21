import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Title from "../components/Title";
import { ChevronLeftIcon } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedServices, selectedDate } = location.state || {
    selectedServices: [],
    selectedDate: null,
  };

  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const calculateTotal = (services) => {
    return services
      .reduce((total, item) => total + item.preco * item.quantity, 0)
      .toFixed(2);
  };

  const handleConfirmPayment = async () => {
    if (!auth.currentUser) {
      alert("Usuário não está autenticado!");
      return;
    }
  
    try {
      const cliente = {
        id: auth.currentUser.uid, // UID único do usuário logado
        nome: auth.currentUser.displayName || "Usuário Anônimo", // Nome do cliente, se disponível
        email: auth.currentUser.email, // E-mail do cliente
      };
  
      const docRef = await addDoc(collection(db, "payments"), {
        cliente, // Associa os dados do cliente ao pagamento
        services: selectedServices,
        date: selectedDate,
        paymentMethod,
        createdAt: new Date().toISOString(),
      });
  
      alert("Pagamento confirmado e salvo no banco de dados! ID: " + docRef.id);
      setShowModal(false);
      navigate("/SelectService");
    } catch (error) {
      console.error("Erro ao salvar o pagamento:", error);
      alert("Ocorreu um erro ao salvar o pagamento. Tente novamente.");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-slate-500 p-6">
      <div>
        <div className="flex justify-center relative mb-2">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-0 bottom-0 left-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Pagamento</Title>
        </div>
        <div className="bg-slate-700 p-6 rounded-md">
          <h1 className="text-center text-slate-50 font-semibold mb-5">
            Resumo do Pedido
          </h1>
          <div className="mt-4 bg-slate-50 rounded-md p-4 shadow-md">
            <p className="text-slate-900 font-bold mb-4">
              Data do Agendamento:{" "}
              <span className="text-blue-600">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("pt-BR")
                  : "Não selecionada"}
              </span>
            </p>

            {selectedServices.map((service) => (
              <div key={service.id} className="mb-2">
                <p className="text-slate-900">Serviço: {service.nome}</p>
                <p className="text-slate-900">
                  Valor: R$ {service.preco.toFixed(2)}
                </p>
              </div>
            ))}
            <p className="text-slate-900 font-bold mt-4">
              Total:{" "}
              <span className="text-green-600">
                R$ {calculateTotal(selectedServices)}
              </span>
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setPaymentMethod("boleto");
                setShowModal(true);
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
            >
              Gerar Boleto
            </button>
            <button
              onClick={() => {
                setPaymentMethod("qrcode");
                setShowModal(true);
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
            >
              Gerar QR Code
            </button>
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Deseja confirmar o pagamento via {paymentMethod === "boleto" ? "Boleto" : "QR Code"}?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmPayment}
                  className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
                >
                  Pagar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
                >
                  Não Pagar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
