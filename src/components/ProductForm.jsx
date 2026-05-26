import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ProductForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    stock: "",
    imagen: ""
  });

  const [errors, setErrors] = useState({});

  // Cargar valores iniciales si estamos editando
  useEffect(() => {
    if (initialValues) {
      setFormData({
        nombre: initialValues.nombre || "",
        precio: initialValues.precio !== undefined ? initialValues.precio : "",
        categoria: initialValues.categoria || "",
        stock: initialValues.stock !== undefined ? initialValues.stock : "",
        imagen: initialValues.imagen || ""
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre del producto es obligatorio";
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = "La categoría es obligatoria";
    }

    if (formData.precio === "" || isNaN(formData.precio)) {
      newErrors.precio = "El precio debe ser un número válido";
    } else if (Number(formData.precio) < 0) {
      newErrors.precio = "El precio no puede ser negativo";
    }

    if (formData.stock === "" || isNaN(formData.stock)) {
      newErrors.stock = "El stock debe ser un número válido";
    } else if (Number(formData.stock) < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        title: "Campos Inválidos",
        text: "Por favor, corrige los errores en el formulario antes de guardar.",
        icon: "warning",
        confirmButtonText: "Revisar",
        confirmButtonColor: "#f59e0b"
      });
      return;
    }

    // Convertir precio y stock a números al enviar
    const productoAEnviar = {
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock)
    };

    onSubmit(productoAEnviar);
  };

  const categoriasSugeridas = ["Ropa", "Electrónica", "Hogar", "Calzado", "Deportes", "Belleza"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Nombre del Artículo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Camiseta de Algodón Premium"
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
            errors.nombre 
              ? "border-red-300 focus:border-red-400 focus:ring-red-200" 
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
          }`}
        />
        {errors.nombre && (
          <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
            ⚠️ {errors.nombre}
          </p>
        )}
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="categoria" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Categoría <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            placeholder="Selecciona o escribe una categoría"
            list="categorias-list"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.categoria 
                ? "border-red-300 focus:border-red-400 focus:ring-red-200" 
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
          />
          <datalist id="categorias-list">
            {categoriasSugeridas.map((cat, idx) => (
              <option key={idx} value={cat} />
            ))}
          </datalist>
        </div>
        {errors.categoria && (
          <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
            ⚠️ {errors.categoria}
          </p>
        )}
      </div>

      {/* Grid de Precio y Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Precio */}
        <div>
          <label htmlFor="precio" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Precio ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="any"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.precio 
                ? "border-red-300 focus:border-red-400 focus:ring-red-200" 
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
          />
          {errors.precio && (
            <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
              ⚠️ {errors.precio}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Stock Disponible <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Cantidad en almacén"
            min="0"
            step="1"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.stock 
                ? "border-red-300 focus:border-red-400 focus:ring-red-200" 
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
          />
          {errors.stock && (
            <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
              ⚠️ {errors.stock}
            </p>
          )}
        </div>
      </div>

      {/* URL de Imagen */}
      <div>
        <label htmlFor="imagen" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Enlace de Imagen (URL)
        </label>
        <input
          type="url"
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="https://ejemplo.com/producto.jpg"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
        />
        <p className="mt-1.5 text-xs text-slate-400 font-medium">
          Dejar vacío para usar una imagen aleatoria profesional.
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl text-white font-semibold text-sm shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando producto...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Guardar en Inventario
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
