# MISHIFLIX - NextJS Application

Este proyecto es una aplicación web desarrollada con **Next.js** que imita la interfaz y funcionalidad de Netflix. Permite a los usuarios explorar secciones de **películas** y **series**, aplicar filtros, y gestionar una lista de favoritos.

---

## **Características Principales**

- **API**: la API que se utilizó fue la de TheMovieDatabase (TMDB).
- **Seguridad**: se hizo uso de variables de entorno para ocultar informacion sensible de la aplicacion (tal como la API Key).
- **Navegación intuitiva** con secciones de películas y series.
- **Filtrado avanzado** para encontrar películas o series específicas.:
  - **Limitacion**: Debido a limitaciones de la API, solo es posible filtrar por titulo o, por genero y ordernar de acuerdo a su popularidad, titulo, votacion, etc (ascendente y descendente).
- **Registro y Login de usuarios**:
  - **Registro**: Los datos se almacenan en el **LocalStorage**.
  - **Login**: La sesión de usuario se maneja mediante **SessionStorage**.
- **Lista de Favoritos**: Los usuarios registrados pueden guardar sus películas o series favoritas.

---

## **Instalación y Ejecución**

### **Requisitos Previos**

- **Node.js v16+ (o superior)**
- **pnpm o npm instalado**
- **Variables de entorno**:
  - **PUBLIC_NEXT_TMDB_API_KEY**: aqui necesitas tu API KEY personal
  - **PUBLIC_NEXT_TMDB_IMAGES_PREFIX**: aqui necesitas la url de prefijo para acceder a los posters de las peliculas y series.

### **Instrucciones**

1. **Clonar el Repositorio**:

   ```bash
   git clone  https://github.com/TheMishi99/mishiflix.git
   ```

2. **Instalar dependencias**:

   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Ejecutar en modo desarrollo**:

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

---

## **Estructura del Proyecto**

- `/app` - Páginas principales de la aplicación.
- `/components` - Componentes reutilizables como tarjetas de películas, botones, formularios, etc.
- `/contexts` - Componentes contextuales de la aplicacion.
- `/hooks` - Hooks para el manejo de logica intermedia de solicitudes a la API.
- `/services` - Funciones principales para el manejo de logica de solicitudes a la API
- `/utils` - Utilidades y funciones auxiliares.
- `/types` - Objetos tipados para un correcto manejo de los datos.

---

## **Tecnologías Usadas**

- **Next.js**: Framework de React para renderizado del lado del servidor.
- **Tailwind CSS**: Para estilizar la interfaz de usuario.
- **LocalStorage**: Para almacenar datos de registro de usuario.
- **SessionStorage**: Para manejar sesiones de usuario logueado.

---

## **Licencia**

Este proyecto está bajo la licencia [MIT](LICENSE).

---

## **Contacto**

Para cualquier consulta o sugerencia, puedes contactarme en: [matiasgd99@gmail.com](mailto:matiasgd99@gmail.com)
