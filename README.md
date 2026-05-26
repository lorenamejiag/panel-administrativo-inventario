# Panel Administrativo de Inventario de E-commerce 📦

¡Bienvenido al Panel Administrativo de Inventario (**StockMaster**)! Esta es una aplicación de tipo **SPA (Single Page Application)** diseñada con **React** y construida con **Vite**. Permite a los administradores de una tienda virtual gestionar de manera eficiente el catálogo de productos (CRUD completo) mediante una interfaz de usuario premium, moderna y responsiva.

## 🚀 Enlaces del Proyecto

*   **🔹 Repositorio GitHub:** [https://github.com/lorenamejiag/panel-administrativo-inventario](https://github.com/lorenamejiag/panel-administrativo-inventario)
*   **🔹 Despliegue en Vercel (Aplicación en línea):** [https://panel-administrativo-inventario.vercel.app](https://panel-administrativo-inventario.vercel.app)
*   **🔹 API MockAPI (Base de datos):** [https://6a137cd46c7db8aac0531ae4.mockapi.io](https://6a137cd46c7db8aac0531ae4.mockapi.io)

---

## 🛠️ Tecnologías Utilizadas

El proyecto utiliza un conjunto moderno y robusto de tecnologías front-end:

*   **React 19:** Biblioteca para construir interfaces de usuario.
*   **Vite:** Herramienta de compilación ultrarrápida y servidor de desarrollo.
*   **React Router Dom v7:** Enrutamiento declarativo para aplicaciones SPA.
*   **Tailwind CSS v4:** Framework CSS con utilidades modernas y diseño responsivo.
*   **Axios:** Cliente HTTP para realizar solicitudes API asíncronas.
*   **SweetAlert2:** Ventanas emergentes, modales y alertas estilizadas para mejorar la experiencia.
*   **LocalStorage:** Persistencia local para simulación de inicio de sesión de usuario.

---

## 🔐 Características Principales

### 1. Autenticación y Seguridad
*   **Ruta Pública (`/login`):** Interfaz moderna y animada con campos para Nombre de Usuario y PIN de seguridad.
*   **Guardado de Sesión:** Al iniciar sesión exitosamente, los datos se almacenan bajo la clave `sesionUsuario` en `localStorage`.
*   **Control de Acceso:** Componente `<ProtectedRoute />` que intercepta accesos no autorizados a rutas internas, redirigiendo inmediatamente al inicio de sesión.
*   **Navbar Dinámico:** Muestra el nombre de usuario activo, avatar generado automáticamente y botón de Cerrar Sesión con confirmación de seguridad.

### 2. CRUD Completo de Productos
La entidad **Producto** cuenta con la siguiente estructura:

```json
{
  "id": "1",
  "nombre": "Camiseta Algodón Premium",
  "precio": 45000,
  "categoria": "Ropa",
  "stock": 15,
  "imagen": "https://picsum.photos/400/300?random=1"
}
```

*   **Listado en Tiempo Real (`/productos`):** Visualización en tarjetas organizadas en cuadrícula responsiva (1 columna móvil, 2 tablet, 3 escritorio).
*   **Buscador y Filtros:** Búsqueda en tiempo real por coincidencia de nombre o categoría, además de filtro desplegable por categorías existentes.
*   **Indicadores de Estado:** Etiquetas visuales dinámicas: *"Agotado"*, *"Pocas unidades"* o cantidad disponible.
*   **Creación y Edición (`/productos/agregar` | `/productos/editar/:id`):** Formulario unificado con validaciones estrictas:
    *   Campos obligatorios: Nombre y Categoría.
    *   Validación numérica: Precio y Stock deben ser valores >= 0.
    *   Alertas de error mediante **SweetAlert2** ante entradas incorrectas.
*   **Eliminación Segura:** Confirmación explícita antes de ejecutar la acción. Mensaje de éxito tras la eliminación exitosa de la base de datos.

---

## 📁 Estructura del Proyecto

El código está organizado siguiendo arquitectura limpia y separación de responsabilidades:

```plaintext
panel-administrativo-inventario/
├── public/                  # Recursos estáticos (favicon, logo)
├── src/
│   ├── assets/              # Imágenes y recursos locales
│   ├── components/          # Componentes reutilizables de UI
│   │   ├── Navbar.jsx       # Barra de navegación superior
│   │   ├── ProductCard.jsx  # Tarjeta individual de producto
│   │   ├── ProductForm.jsx  # Lógica compartida de formulario
│   │   └── ProtectedRoute.jsx # Protección de rutas privadas
│   ├── helpers/             # Utilidades generales
│   │   └── local-storage.js # Métodos get/save/remove de sesión
│   ├── pages/               # Vistas principales
│   │   ├── Login.jsx        # Pantalla de autenticación
│   │   ├── ProductsList.jsx  # Panel principal / Inventario
│   │   └── AddEditProduct.jsx # Formulario de creación/edición
│   ├── routes/              # Sistema de navegación
│   │   └── routerApp.jsx
│   ├── services/            # Capa de conexión con API
│   │   └── productos.js     # Peticiones HTTP (GET, POST, PUT, DELETE)
│   ├── App.jsx
│   ├── index.css           # Estilos globales y Tailwind
│   └── main.jsx
├── .env.example             # Plantilla de variables de entorno
├── .gitignore               # Archivos ignorados por Git
├── eslint.config.js
├── package.json
└── vite.config.js
```

---

## 🔌 Configuración de API y Variables de Entorno

La conexión de datos se realiza con **MockAPI.io**. La URL base utilizada en este proyecto es:
```plaintext
https://6a137cd46c7db8aac0531ae4.mockapi.io
```

Para configurar tu propio entorno:
1. Crea un proyecto en [MockAPI.io](https://mockapi.io) y agrega el recurso `productos` con la estructura definida arriba.
2. Duplica el archivo `.env.example` y renómbralo como `.env`.
3. Define tu variable de entorno:
   ```env
   VITE_API_URL=https://TU_CODIGO.mockapi.io
   ```
4. Reinicia el servidor de desarrollo.

> [!NOTE]
> En el despliegue de producción (Vercel), la variable de entorno fue configurada directamente en el panel de configuración del proyecto para garantizar el funcionamiento en línea.

---

## 💻 Instrucciones de Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/lorenamejiag/panel-administrativo-inventario.git
cd panel-administrativo-inventario
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar entorno de desarrollo
```bash
npm run dev
```
Abre tu navegador en [http://localhost:5173](http://localhost:5173) para ver la aplicación.

### 4. Compilar para Producción
Genera la versión optimizada lista para desplegar:
```bash
npm run build
```
Los archivos resultantes quedarán en la carpeta `dist/`.
