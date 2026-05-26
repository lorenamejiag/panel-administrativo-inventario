import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLocalStorage } from "../helpers/local-storage";
import Swal from "sweetalert2";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [pin, setPin] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!usuario.trim() || !pin.trim()) {
      Swal.fire({
        title: "Campos Vacíos",
        text: "Por favor, ingresa tu Nombre de Usuario y tu PIN de acceso.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#3b82f6"
      });
      return;
    }

    setCargando(true);

    // Simular un pequeño retardo de conexión para dar mejor sensación de respuesta (UX)
    setTimeout(() => {
      try {
        // Guardar sesión en LocalStorage bajo la clave "sesionUsuario"
        const datosSesion = {
          username: usuario.trim(),
          pin: pin.trim(),
          fechaIngreso: new Date().toISOString()
        };

        saveLocalStorage("sesionUsuario", datosSesion);

        Swal.fire({
          title: "¡Bienvenido al Sistema!",
          text: `Sesión iniciada como ${usuario}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          setCargando(false);
          navigate("/productos");
        });
      } catch (error) {
        setCargando(false);
        Swal.fire({
          title: "Error de Sesión",
          text: "Ocurrió un error al intentar guardar tu sesión. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#dc2626"
        });
      }
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background blobs for premium glassmorphism effect */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Brand / Logo */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-24 w-auto object-contain" // h-24 = TAMAÑO GRANDE
            />
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">StockMaster</h2>
          <p className="mt-2 text-sm font-medium text-slate-400">Ingreso al Panel Administrativo de Inventario</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Nombre de Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.29-.226.395-.552.41-.893A9.975 9.975 0 0010 12c-2.31 0-4.438.784-6.131 2.1z" />
                </svg>
              </div>
              <input
                id="username"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* PIN Field */}
          <div>
            <label htmlFor="pin" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              PIN de Seguridad
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 tracking-widest focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Remember & Forgot mock elements */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 pt-1">
            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500/25"
                defaultChecked
              />
              Mantener sesión
            </label>
            <span className="hover:text-indigo-400 transition-colors cursor-pointer">
              ¿Olvidaste tu PIN?
            </span>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={cargando}
              className="w-full flex justify-center items-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-600/50 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 cursor-pointer"
            >
              {cargando ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ingresando...
                </>
              ) : (
                "Acceder al Panel"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
