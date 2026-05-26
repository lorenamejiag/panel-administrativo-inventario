import { useNavigate, Link, useLocation } from "react-router-dom";
import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sesionRaw = getLocalStorage("sesionUsuario");

  let nombreUsuario = "Administrador";
  if (sesionRaw) {
    try {
      // Intentamos parsear si se guardó como objeto JSON
      const sesion = JSON.parse(sesionRaw);
      nombreUsuario = sesion.username || sesion;
    } catch (e) {
      // Si no es un JSON válido, asumimos que es una cadena directa
      nombreUsuario = sesionRaw;
    }
  }

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar Sesión?",
      text: "Estás a punto de salir del panel de administración.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b"
    }).then((result) => {
      if (result.isConfirmed) {
        removeLocalStorage("sesionUsuario");
        navigate("/login");
        Swal.fire({
          title: "Sesión Finalizada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const inicial = nombreUsuario.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link to="/productos" className="flex items-center gap-3 group">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600/10 text-indigo-600 ring-1 ring-indigo-600/20 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <img
              src="/logo.png"
              alt="Logo de la empresa"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">StockMaster</h1>
            <p className="text-xxs sm:text-xs font-medium text-slate-500">Panel de Administración</p>
          </div>
        </Link>

        {/* Navigation Items / Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Active Navigation Tabs */}
          <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
            <Link
              to="/productos"
              className={`rounded-lg px-3 py-2 transition-colors ${location.pathname === "/productos"
                ? "bg-slate-100 text-indigo-600"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
            >
              Inventario
            </Link>
            <Link
              to="/productos/agregar"
              className={`rounded-lg px-3 py-2 transition-colors ${location.pathname === "/productos/agregar"
                ? "bg-slate-100 text-indigo-600"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
            >
              Nuevo Producto
            </Link>
          </nav>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 font-semibold text-white shadow-sm">
                {inicial}
              </div>
              <span className="hidden md:block text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                {nombreUsuario}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              title="Cerrar sesión"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
