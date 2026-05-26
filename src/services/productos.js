import axios from "axios";
import Swal from "sweetalert2";

// URL base de MockAPI.io (configurable a través de variables de entorno)
// La URL base correcta es la del dominio del proyecto de MockAPI (sin el recurso "/productos" al final)
const BASE_URL = import.meta.env.VITE_API_URL || "https://6a137cd46c7db8aac0531ae4.mockapi.io";

const api = axios.create({
  baseURL: BASE_URL
});

// Obtener todos los productos
export async function getProductos() {
  try {
    const response = await api.get("/productos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

// Obtener un producto por ID (para edición)
export async function getProductoById(id) {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw error;
  }
}

// Crear un nuevo producto
export async function createProducto(producto) {
  const precio = Number(producto.precio);
  const stock = Number(producto.stock);

  if (precio < 0 || stock < 0) {
    Swal.fire({
      title: "Error de Validación",
      text: "El precio y el stock deben ser números positivos o cero.",
      icon: "error",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#dc2626"
    });
    throw new Error("El precio y el stock no pueden ser negativos.");
  }

  try {
    const response = await api.post("/productos", producto);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
}

// Actualizar un producto existente
export async function updateProducto(id, producto) {
  const precio = Number(producto.precio);
  const stock = Number(producto.stock);

  if (precio < 0 || stock < 0) {
    Swal.fire({
      title: "Error de Validación",
      text: "El precio y el stock deben ser números positivos o cero.",
      icon: "error",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#dc2626"
    });
    throw new Error("El precio y el stock no pueden ser negativos.");
  }

  try {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
}

// Eliminar un producto
export async function deleteProducto(id) {
  try {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
}

