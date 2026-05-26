import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/local-storage";

/**
 * Componente para proteger rutas privadas.
 * Redirige a /login si no hay una sesión activa ("sesionUsuario") en LocalStorage.
 */
function ProtectedRoute({ children, componente }) {
  const sesion = getLocalStorage("sesionUsuario");

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : componente;
}

export default ProtectedRoute;
