import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";

function SelectService() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); 
  const navigate = useNavigate(); 

  const servicesCabelo = [
    {
      id: 1,
      img: "https://blog.alfalooksstore.com.br/wp-content/uploads/2022/04/Scissor-Fade-Degrade-Masculino-Tesoura-1024x682.jpg",
      nome: "Corte com tesoura",
      descricao: "",
      preco: 25.99,
      tipo: "cabelo",
    },
    {
      id: 2,
      img: "https://blog.alfalooksstore.com.br/wp-content/uploads/2022/04/degrade-masculino-low-fade.jpg",
      nome: "Corte na máquina",
      descricao: "",
      preco: 19.99,
      tipo: "cabelo",
    },
    {
      id: 3,
      img: "https://blog.alfalooksstore.com.br/wp-content/uploads/2022/04/degrade-mid-fade.jpg",
      nome: "Máquina + Tesoura",
      descricao: "",
      preco: 29.99,
      tipo: "cabelo",
    },
  ];

  const serviceBarbaBigode = {
    id: 4,
    img: "https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia12716/mulheres-fazem-cabelo-barba-e-bigode-sim-confira2-cpt.jpg",
    nome: "Barba/Bigode",
    descricao: "",
    preco: 15.99,
    tipo: "barba",
  };

  function serviceSelected(service) {
    if (service.tipo === "cabelo") {
      setSelectedServices([
        { ...service, quantity: 1 },
        ...selectedServices.filter((item) => item.tipo !== "cabelo"),
      ]);
    } else {
      const alreadySelected = selectedServices.find(
        (item) => item.id === service.id
      );
      if (alreadySelected) {
        setSelectedServices(
          selectedServices.filter((item) => item.id !== service.id)
        );
      } else {
        setSelectedServices([...selectedServices, { ...service, quantity: 1 }]);
      }
    }
  }

  const calculateTotal = (services) => {
    return services
      .reduce((total, item) => total + item.preco * item.quantity, 0)
      .toFixed(2);
  };

  const handleNextPage = () => {
    console.log(selectedServices)
    if (!selectedDate || selectedServices.length == 0) {
      alert("Data ou serviço não selecionado.");
      return;
    }
    navigate("/Payment", { state: { selectedServices, selectedDate } });
  };

  return (
    <div className="flex justify-center h-screen bg-slate-500 p-6">
      <div>
        <Title>Barber Fácil</Title>
        <div className="bg-slate-700 p-4 rounded-md">
          <h1 className="text-center mb-5 font-semibold text-slate-50">
            Serviços prestados
          </h1>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {servicesCabelo.map((service) => (
              <div
                key={service.id}
                onClick={() => serviceSelected(service)}
                className="cursor-pointer bg-white p-4 rounded shadow hover:bg-gray-200"
              >
                <img
                  src={service.img}
                  alt={service.nome}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h2 className="text-center font-semibold">{service.nome}</h2>
                <p className="text-center">R$ {service.preco.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div
              onClick={() => serviceSelected(serviceBarbaBigode)}
              className="cursor-pointer bg-white p-4 rounded shadow hover:bg-gray-200"
            >
              <img
                src={serviceBarbaBigode.img}
                alt={serviceBarbaBigode.nome}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h2 className="text-center font-semibold">
                {serviceBarbaBigode.nome}
              </h2>
              <p className="text-center">
                R$ {serviceBarbaBigode.preco.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-center text-slate-50 mb-3">Selecione a data</h2>
            <div className="flex justify-center">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="rounded p-2 text-center bg-white shadow-md w-60"
                placeholderText="Escolha uma data"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-md p-1 mb-5">
            <table>
              <thead>
                <tr className="border border-slate-500">
                  <th>Serviço</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {selectedServices.map((service) => (
                  <tr key={service.id} className="border border-slate-500">
                    <td className="p-5">{service.nome}</td>
                    <td className="px-7">R$ {service.preco.toFixed(2)}</td>
                    <td className="px-7">
                      <button
                        onClick={() =>
                          setSelectedServices(
                            selectedServices.filter(
                              (item) => item.id !== service.id
                            )
                          )
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border border-slate-500">
                  <td colSpan="2" className="p-2 text-right font-bold">
                    Total:
                  </td>
                  <td className="p-2 font-bold">
                    R$ {calculateTotal(selectedServices)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <Button
            onClick={handleNextPage}
          >
            Ir para Resumo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SelectService;