import Img from "./Img";

function Services({ services, serviceSelected }) {
  return (
    <ul className="flex gap-4 text-center">
      {services.map((service) => (
        <li
          key={service.id}
          className="bg-slate-50 border border-slate-300 rounded-md p-1"
        >
          <div>
            <Img img={service.img} />
            <p className="font-bold mt-1">{service.nome}</p>
            <p className="text-gray-500">{service.descricao}</p>
            <p className="text-green-600 font-semibold">R$ {service.preco}</p>
            <input
              type="radio"
              name="service"
              value={service.id}
              onClick={() => serviceSelected(service)}
            />
          </div>
        </li>     
      ))}
    </ul>
  );
}

export default Services;
