import axios from "axios";
import { API_URL } from "../app.config.jsx";

const urlBase = `${API_URL}/articulos`;

export async function obtenerArticulosVenta(consulta = "", page = 0, tamañoPagina = 9) {
  try {
    const response = await axios.get(`${API_URL}/articulosPageQuery`, {
      params: { consulta, page, size: tamañoPagina }
    });
    return response.data;
  } catch (error) {
    console.error("Error buscando articulos:", error);
    throw error;
  }
}

export async function obtenerArticuloVenta(id) {
  try {
    const { data } = await axios.get(`${API_URL}/articulos/${id}`);
    return data;
  } catch (error) {
    console.error("Error en buscar una articulo:", error);
    throw error;
  }
}

export async function nuevoArticuloVenta(model) {
  try {
    if (model.id > 0) {
      const { data } = await axios.put(`${API_URL}/articulos/${model.id}`, model);
      return data;
    } else {
      const { data } = await axios.post(`${API_URL}/articulos`, model);
      return data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function eliminarArticuloVenta(id) {
  try {
    await axios.delete(`${API_URL}/articuloEliminar/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando articulo:", error);
    throw error;
  }
}