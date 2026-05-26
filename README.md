# Panel Administrativo de Inventario de E-commerce 📦

¡Bienvenido al **Panel Administrativo de Inventario (StockMaster)**! Esta es una aplicación de tipo SPA (Single Page Application) diseñada con **React** y construida con **Vite**. Permite a los administradores de una tienda virtual gestionar de manera eficiente el catálogo de productos (CRUD completo) mediante una interfaz de usuario premium, moderna y responsiva.

## 🚀 Tecnologías Utilizadas

El proyecto utiliza un conjunto moderno y robusto de tecnologías front-end:
*   **React 19** (Biblioteca para construir interfaces de usuario)
*   **Vite 8** (Herramienta de compilación ultrarrápida y servidor de desarrollo)
*   **React Router Dom 7** (Enrutamiento declarativo para Single Page Applications)
*   **Tailwind CSS v4** (Framework CSS con utilidades modernas integradas nativamente en Vite)
*   **Axios** (Cliente HTTP para realizar solicitudes API asíncronas)
*   **SweetAlert2** (Ventanas emergentes animadas, modales y alertas estilizadas)
*   **LocalStorage** (Persistencia local para simulación de inicio de sesión de usuario)

---

## 🔐 Características Principales

### 1. Autenticación y Seguridad
*   **Ruta Pública (`/login`):** Interfaz moderna y animada con campos para **Nombre de Usuario** y **PIN** de seguridad.
*   **Guardado de Sesión:** Al iniciar sesión exitosamente, los datos se almacenan bajo la clave `"sesionUsuario"` en `localStorage`.
*   **Control de Acceso (Route Guard):** Utiliza un componente `<ProtectedRoute />` que intercepta accesos no autorizados a rutas internas (como `/productos`), redirigiendo inmediatamente a `/login`.
*   **Navbar Dinámico:** Muestra el nombre de usuario activo, genera un avatar con su inicial y provee un botón estilizado para **Cerrar Sesión** que limpia los datos de sesión tras confirmación del usuario.

### 2. CRUD Completo de Productos
*   **Entidad Producto:**
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
*   **Listado en Tiempo Real (`/productos`):** Muestra tarjetas profesionales de productos organizadas en un Grid responsivo mediante Tailwind (1 col en móvil, 2 en tablet, 3 en escritorio).
*   **Buscador Integrado:** Campo de texto interactivo arriba del catálogo que filtra en tiempo real por coincidencia de **Nombre** o **Categoría** sin recargar la página.
*   **Filtro por Categoría:** Desplegable dinámico que extrae las categorías existentes en el catálogo actual para refinar la búsqueda.
*   **Indicadores Visuales de Stock:** Alertas dinámicas sobre las tarjetas ("Agotado", "Pocas unidades", "Stock: N") según la disponibilidad.
*   **Creación y Edición (`/productos/agregar` y `/productos/editar/:id`):** Formulario robusto con validaciones incorporadas:
    *   Nombre y Categoría son obligatorios.
    *   Precio y Stock deben ser números válidos mayores o iguales a cero.
    *   Validación a nivel de servicios: lanza un error y bloquea el envío a través de SweetAlert2 ante valores negativos.
*   **Eliminación Segura:** Pide confirmación explícita mediante un modal SweetAlert2: *¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer*. Si el usuario acepta, se realiza la petición HTTP `DELETE` y se notifica del éxito.

---

## 📁 Estructura del Proyecto

El código está organizado siguiendo las mejores prácticas de arquitectura React SPA:

```text
panel-administrativo-inventario/
├── public/                  # Recursos estáticos
├── src/
│   ├── assets/              # Imágenes y recursos locales
│   ├── components/          # Componentes reutilizables de UI
│   │   ├── Navbar.jsx       # Barra de navegación con avatar y logout
│   │   ├── ProductCard.jsx  # Tarjeta individual con SweetAlert2 de eliminación
│   │   ├── ProductForm.jsx  # Formulario unificado con validaciones
│   │   └── ProtectedRoute.jsx # Protector de rutas privadas
│   ├── helpers/             # Utilidades y acceso a LocalStorage
│   │   └── local-storage.js # Métodos get, save, remove de localStorage
│   ├── pages/               # Páginas principales del enrutador
│   │   ├── Login.jsx        # Pantalla de Login estética
│   │   ├── ProductsList.jsx # Dashboard principal con buscador y filtros
│   │   └── AddEditProduct.jsx # Formulario de creación y edición (Wrapper)
│   ├── routes/              # Configuración de enrutamiento
│   │   └── routerApp.jsx    # Mapeo de rutas (públicas y privadas)
│   ├── services/            # Capa de servicios y comunicación HTTP
│   │   └── productos.js     # Cliente Axios de MockAPI con lógica de negocio
│   ├── App.jsx              # Redireccionador inicial
│   ├── index.css            # Archivo CSS de Tailwind v4 y estilos globales
│   └── main.jsx             # Punto de entrada de React con RouterProvider
├── .env                     # Variables de entorno locales
├── .env.example             # Plantilla de variables de entorno
├── eslint.config.js         # Reglas de linting del código
├── package.json             # Dependencias del proyecto
└── vite.config.js           # Configuración de plugins de Vite
```

---

## 🔌 API y Variables de Entorno

La conexión de datos se realiza con **MockAPI.io**. Para configurar tu propia API:

1.  Crea un proyecto en [MockAPI.io](https://mockapi.io) y agrega el recurso `productos` con la estructura descrita.
2.  Duplica el archivo `.env.example` en la raíz de tu proyecto.
3.  Renómbralo a `.env`.
4.  Define la URL base de tu API:
    ```env
    VITE_API_URL=https://tu-id-mockapi.mockapi.io/api/v1
    ```

> 💡 *Nota: Si no se define una variable de entorno `.env`, la aplicación se conectará automáticamente a un endpoint público predeterminado en MockAPI para garantizar que funcione al instante.*

---

## 💻 Instrucciones de Instalación y Ejecución

Sigue estos sencillos pasos para poner en marcha el proyecto en tu máquina local:

### 1. Clonar o acceder a la carpeta del proyecto
```bash
cd panel-administrativo-inventario
```

### 2. Instalar dependencias
Instala todas las bibliotecas requeridas (React, React Router, Tailwind v4, Axios, SweetAlert2):
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo
Inicia el entorno de desarrollo local con Vite:
```bash
npm run dev
```
Abre la consola y navega al enlace provisto (usualmente `http://localhost:5173`) para ver la aplicación funcionando.

### 4. Compilar para Producción
Si deseas empaquetar el código optimizado para desplegar en la web:
```bash
npm run build
```
Los archivos optimizados quedarán listos en la carpeta `dist`.
