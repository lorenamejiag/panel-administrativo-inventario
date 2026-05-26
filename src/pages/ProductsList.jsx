import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../services/productos";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Swal from "sweetalert2";

const ProductsList = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorApi, setErrorApi] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const cargarInventario = async () => {
    setCargando(true);
    setErrorApi(false);
    try {
      const data = await getProductos();
      // Garantizar que la data sea un arreglo
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setErrorApi(true);
      Swal.fire({
        title: "Error de Conexión",
        text: "No se pudieron obtener los productos. Por favor, verifica la URL de tu API o tu conexión a Internet.",
        icon: "error",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#4f46e5"
      }).then((result) => {
        if (result.isConfirmed) {
          cargarInventario();
        }
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  // Extraer las categorías únicas disponibles en el inventario actual
  const categoriasUnicas = Array.from(
    new Set(productos.map((p) => p.categoria).filter(Boolean))
  );

  // Filtrado en tiempo real (Buscador por Nombre/Categoría + Filtro por Categoría Seleccionada)
  const productosFiltrados = productos.filter((p) => {
    const cumpleBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const cumpleCategoria =
      categoriaSeleccionada === "" || p.categoria === categoriaSeleccionada;

    return cumpleBusqueda && cumpleCategoria;
  });

  // Estadísticas rápidas para darle un look premium y profesional
  const totalStock = productos.reduce((sum, p) => sum + Number(p.stock), 0);
  const totalValor = productos.reduce((sum, p) => sum + Number(p.precio) * Number(p.stock), 0);
  const sinStockCount = productos.filter((p) => Number(p.stock) === 0).length;

  const totalValorFormateado = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(totalValor);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Barra de navegación reutilizable */}
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Encabezado y Estadísticas */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Inventario General
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monitorea existencias, precios y actualiza el catálogo en tiempo real.
              </p>
            </div>
            <div>
              <Link
                to="/productos/agregar"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar Producto
              </Link>
            </div>
          </div>

          {/* Tarjetas de Resumen (Aesthetic KPI Cards) */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Productos</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">{productos.length}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Valor de Inventario</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">{totalValorFormateado}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Productos Agotados</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">{sinStockCount}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buscador y Controles de Filtrado */}
        <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
          {/* Input Buscador */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
            </div>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar producto por nombre o categoría..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Selector de Categorías */}
          <div className="w-full md:w-[240px]">
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
            >
              <option value="">Todas las Categorías</option>
              {categoriasUnicas.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Zona del Listado */}
        {cargando ? (
          // Estado de Carga: Skeleton Grid
          <section className="flex flex-col items-center justify-center py-16">
            <div className="flex items-center gap-3 text-indigo-600 mb-6 font-semibold animate-pulse">
              <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cargando inventario...
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
                  <div className="h-44 bg-slate-200 rounded-xl w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded-lg w-full pt-4"></div>
                </div>
              ))}
            </div>
          </section>
        ) : errorApi ? (
          // Error en la petición
          <section className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-white p-8">
            <div className="mx-auto w-12 h-12 text-red-500 bg-red-50 rounded-xl grid place-items-center mb-4">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-slate-800">Error al cargar productos</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              No logramos conectar con el servidor de MockAPI.io. Verifica tu conexión de red e intenta nuevamente.
            </p>
            <button
              onClick={cargarInventario}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Reintentar Conexión
            </button>
          </section>
        ) : productosFiltrados.length === 0 ? (
          // Listado Vacío (No hay resultados)
          <section className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-white p-8">
            <div className="mx-auto w-12 h-12 text-indigo-500 bg-indigo-50 rounded-xl grid place-items-center mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-800">No se encontraron productos</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              {productos.length === 0
                ? "Aún no hay productos en el inventario. Haz clic en 'Agregar Producto' para registrar el primero."
                : "Ningún producto coincide con el filtro de búsqueda seleccionado."}
            </p>
            {(busqueda || categoriaSeleccionada) && (
              <button
                onClick={() => {
                  setBusqueda("");
                  setCategoriaSeleccionada("");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Limpiar Filtros
              </button>
            )}
          </section>
        ) : (
          // Grid de Tarjetas de Productos
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onDeleteSuccess={cargarInventario}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductsList;
