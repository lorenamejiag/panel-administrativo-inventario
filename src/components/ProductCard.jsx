import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProducto } from "../services/productos";

const ProductCard = ({ producto, onDeleteSuccess }) => {
  const { id, nombre, precio, categoria, stock, imagen } = producto;

  // Si la imagen no está definida o está vacía, se usa picsum con un query aleatorio basado en el id
  const urlImagen = imagen && imagen.trim() !== "" 
    ? imagen 
    : `https://picsum.photos/400/300?random=${id}`;

  // Formateador de moneda en pesos (o formato estándar elegante)
  const precioFormateado = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(precio);

  // Paleta de colores dinámica para las categorías
  const getCategoriaClase = (cat) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("ropa") || c.includes("vestir")) return "bg-blue-50 text-blue-700 ring-blue-700/10";
    if (c.includes("electr") || c.includes("tecnol")) return "bg-purple-50 text-purple-700 ring-purple-700/10";
    if (c.includes("hogar") || c.includes("mueble")) return "bg-amber-50 text-amber-700 ring-amber-700/10";
    if (c.includes("calzado") || c.includes("zapato")) return "bg-emerald-50 text-emerald-700 ring-emerald-700/10";
    return "bg-slate-50 text-slate-700 ring-slate-700/10";
  };

  // Indicador de nivel de stock
  const getStockBadge = (cant) => {
    const n = Number(cant);
    if (n === 0) {
      return (
        <span className="inline-flex items-center gap-1 rounded bg-red-50 px-1.5 py-0.5 text-xxs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          ● Agotado
        </span>
      );
    }
    if (n <= 5) {
      return (
        <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-xxs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/10">
          ● Pocas unidades ({n})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-xxs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
        ● Stock: {n}
      </span>
    );
  };

  // Función de confirmación y eliminación con SweetAlert2
  const handleEliminar = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626", // Rojo como solicita la especificación
      cancelButtonColor: "#64748b"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Cargador simulado durante el borrado
          Swal.fire({
            title: "Eliminando...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          await deleteProducto(id);
          
          Swal.fire({
            title: "Eliminado correctamente",
            text: "El producto ha sido removido del inventario.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });

          // Notificar al componente padre para refrescar la lista
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        } catch (error) {
          Swal.fire({
            title: "Error al eliminar",
            text: "No se pudo conectar con el servidor. Inténtalo de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3b82f6"
          });
        }
      }
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={urlImagen}
          alt={nombre}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Pill Floating */}
        <span className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset backdrop-blur-md bg-white/90 shadow-sm ${getCategoriaClase(categoria)}`}>
          {categoria}
        </span>
      </div>

      {/* Product Body Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200" title={nombre}>
            {nombre}
          </h3>
          {getStockBadge(stock)}
        </div>

        {/* Pricing */}
        <p className="mt-2.5 text-lg font-extrabold text-slate-900">
          {precioFormateado}
        </p>

        {/* Buttons / Actions */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100">
          <Link
            to={`/productos/editar/${id}`}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.83 20.013a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Editar
          </Link>
          
          <button
            onClick={handleEliminar}
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
