import axios from "axios";
import { API_URL } from "../app.config.jsx";

export async function obtenerClientesPorPagina(consulta, page, tamañoPagina) {
  const urlBase = API_URL + "/clientesPageQuery";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}?consulta=${consulta}&page=${page}&size=${tamañoPagina}`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerClientes() {
  const urlBase = API_URL + "/clientes";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerCliente(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/cliente/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error en buscar un cliente:", error);
    throw error;
  }
}

export async function nuevoCliente(cliente) {
  const dataCliente = {
    ...cliente,
    fechaInicio: "2024-11-20",
    fechaNacimiento: "2024-11-20",
  }

  try {
    if (cliente.id > 0) {
      const { data } = await axios({
        method: "PUT",
        url: `${API_URL}/clientes/${cliente.id}`,
        data: dataCliente,
      });
      return data;
    } else {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/clientes`,
        data: dataCliente,
      });
      return data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function eliminarCliente(id) {
  try {
    const { data } = await axios.delete(`${API_URL}/cliente/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
