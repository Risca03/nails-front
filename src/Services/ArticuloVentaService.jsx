import axios from "axios";
import { API_URL } from "../app.config.js";

const urlBase = API_URL + "/articulosPageQuery";
export async function obtenerArticulosVenta(consulta, page, tamañoPagina) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}?consulta=${consulta}&page=${page}&size=${tamañoPagina}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando articulos:", error);
    throw error;
  }
}

export async function obtenerArticuloVenta(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/articulos/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error en buscar una articulo:", error);
    throw error;
  }
}

export async function nuevoArticuloVenta(model) {
  try {
    if (model.id > 0) {
      const { data } = await axios({
        method: "PUT",
        url: `${API_URL}/articulos/${model.id}`,
        data: model,
      });
      return data;
    } else {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/articulos`,
        data: model,
      });
      return data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function eliminarArticuloVenta(id) {
  const urlBase = API_URL + "/articuloEliminar";
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${urlBase}/${id}`,
    });
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}