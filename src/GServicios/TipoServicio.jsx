import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  nuevoTipoServicio,
  obtenerTipoServicio,
} from "../Services/TipoServicioService";

export default function TipoServicio({ title }) {
  let navegacion = useNavigate();

  const { id } = useParams();

  const [tipoServicio, setTipoServicio] = useState({
    denominacion: "",
  });

  const { denominacion } = tipoServicio;

  useEffect(() => {
    cargarModel();
  }, []);

  const cargarModel = async () => {
    if (id > 0) {
      console.log(id);
      const resultado = await obtenerTipoServicio(id);
      setTipoServicio(resultado);
    }
  };

  const cambiarFormulario = ({ target: { name, value } }) => {
    //spread operator ... (expandir los atributos)
    setTipoServicio({ ...tipoServicio, [name]: value });
  };

  const registrar = async (e) => {
    e.preventDefault();
    nuevoTipoServicio(tipoServicio);
    // Redirigimos a la pagina de inicio
    navegacion("/tipoServicioList");
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de tipo servicio / {title} </h1>
        <hr></hr>
      </div>

      <form onSubmit={(e) => registrar(e)}>
        <div className="mb-3">
          <label htmlFor="denominacion" className="form-label">
            {" "}
            Denominacion
          </label>
          <input
            type="text"
            className="form-control"
            id="denominacion"
            name="denominacion"
            required={true}
            value={denominacion}
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
            <a href="/tipoServicioList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}