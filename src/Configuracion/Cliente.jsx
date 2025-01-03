import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nuevoCliente, obtenerCliente } from "../Services/ClienteService";
import PropTypes from 'prop-types';
Cliente.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function Cliente({ title }) {

  let navegacion = useNavigate();

  const { id } = useParams();

  const [cliente, setCliente] = useState({
    razonSocial: "",
    celular: "",
    mail: "",
  });

  const { razonSocial, celular, mail } = cliente;

  useEffect(() => {
    cargarCliente();
  }, []);

  const cargarCliente = async () => {
    if (id > 0) {
      const resultado = await obtenerCliente(id);
      setCliente(resultado);
    }
  };

  const cambiarFormulario = ({ target: { name, value } }) => {
    //spread operator ... (expandir los atributos)
    setCliente({ ...cliente, [name]: value });
  };

  const registrar = async (e) => {
    e.preventDefault();
    nuevoCliente(cliente);
    // const urlBase = "http://localhost:8080/clientes";
    // if (id > 0 ) {
    //   await axios.put(`${urlBase}/${id}`, cliente);
    // } else {
    //   const respo = await axios.post(urlBase, cliente);
    //   console.log(respo);
    // }
    // Redirigimos a la pagina de inicio
    navegacion("/clienteList");
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de Clientes / {title} </h1>
        <hr></hr>
      </div>

      <form onSubmit={(e) => registrar(e)}>
        <div className="mb-3">
          <label htmlFor="razonSocial" className="form-label">
            {" "}
            Apellido Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="razonSocial"
            name="razonSocial"
            required={true}
            value={razonSocial}
            onChange={(e) => cambiarFormulario(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="celular" className="form-label">
            {" "}
            Celular
          </label>
          <input
            type="number"
            className="form-control"
            id="celular"
            name="celular"
            required={true}
            value={celular}
            onChange={(e) => cambiarFormulario(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            {" "}
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="mail"
            name="mail"
            value={mail}
            onChange={(e) => cambiarFormulario(e)}
          />
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/clienteList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}