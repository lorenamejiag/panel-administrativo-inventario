import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProductsList from "../pages/ProductsList";
import AddEditProduct from "../pages/AddEditProduct";
import ProtectedRoute from "../components/ProtectedRoute";

/**
 * Definición del enrutamiento de la aplicación.
 * Mapea las vistas públicas y privadas.
 */
export let routerApp = [
  // Redireccionar raíz a productos (que a su vez verificará sesión)
  {
    path: "/",
    element: <Navigate to="/productos" replace />,
  },
  // Ruta pública de inicio de sesión
  {
    path: "/login",
    element: <Login />,
  },
  // Panel de productos (Protegido)
  {
    path: "/productos",
    element: (
      <ProtectedRoute>
        <ProductsList />
      </ProtectedRoute>
    ),
  },
  // Agregar nuevo producto (Protegido)
  {
    path: "/productos/agregar",
    element: (
      <ProtectedRoute>
        <AddEditProduct />
      </ProtectedRoute>
    ),
  },
  // Editar producto existente (Protegido)
  {
    path: "/productos/editar/:id",
    element: (
      <ProtectedRoute>
        <AddEditProduct />
      </ProtectedRoute>
    ),
  },
  // Comodín para redirigir cualquier otra ruta inexistente
  {
    path: "*",
    element: <Navigate to="/productos" replace />,
  },
];
