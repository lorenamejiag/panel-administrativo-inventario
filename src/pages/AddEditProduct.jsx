import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createProducto, updateProducto, getProductoById } from "../services/productos";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import Swal from "sweetalert2";

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = !!id;

  const [productoAEditar, setProductoAEditar] = useState(null);
  const [cargandoDatos, setCargandoDatos] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);

  // Obtener los datos del producto si estamos editando
  useEffect(() => {
    if (esEdicion) {
      const obtenerProducto = async () => {
        try {
          const data = await getProductoById(id);
          setProductoAEditar(data);
        } catch (error) {
          console.error("Error al obtener el producto:", error);
          Swal.fire({
            title: "Producto No Encontrado",
            text: "El producto que intentas editar no existe o hubo un error de red.",
            icon: "error",
            confirmButtonText: "Volver al Listado",
            confirmButtonColor: "#4f46e5"
          }).then(() => {
            navigate("/productos");
          });
        } finally {
          setCargandoDatos(false);
        }
      };
      obtenerProducto();
    }
  }, [id, esEdicion, navigate]);

  const handleSubmit = async (datosProducto) => {
    setGuardando(true);
    try {
      if (esEdicion) {
        await updateProducto(id, datosProducto);
        Swal.fire({
          title: "¡Producto Actualizado!",
          text: "Los cambios se guardaron correctamente en el inventario.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate("/productos");
        });
      } else {
        await createProducto(datosProducto);
        Swal.fire({
          title: "¡Producto Registrado!",
          text: "El nuevo artículo ha sido agregado al inventario.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate("/productos");
        });
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
      // Las alertas de precios negativos ya son lanzadas en el servicio, 
      // aquí capturamos otros posibles fallos de red o de API.
      if (!error.message.includes("negativos")) {
        Swal.fire({
          title: "Error al Guardar",
          text: "No se pudo guardar la información del producto. Inténtalo más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#dc2626"
        });
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        {/* Enlace para volver */}
        <div className="mb-6">
          <Link
            to="/productos"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al inventario
          </Link>
        </div>

        {/* Card Contenedora del Formulario */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
          {/* Header del formulario */}
          <div className="mb-8 border-b border-slate-100 pb-5">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {esEdicion ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {esEdicion 
                ? "Modifica los campos del artículo para actualizar las existencias en tiempo real." 
                : "Completa los siguientes datos para registrar un nuevo artículo en tu e-commerce."}
            </p>
          </div>

          {/* Estado de carga de datos iniciales */}
          {cargandoDatos ? (
            <div className="flex flex-col items-center justify-center py-12 text-indigo-600 gap-3">
              <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm font-semibold">Cargando datos del producto...</p>
            </div>
          ) : (
            // Formulario reutilizable
            <ProductForm
              initialValues={productoAEditar}
              onSubmit={handleSubmit}
              isSubmitting={guardando}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AddEditProduct;
