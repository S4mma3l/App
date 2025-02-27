# Biblioteca Digital

¡Bienvenido a la Biblioteca Digital, tu portal de acceso a un mundo de conocimiento!

## Descripción

Esta aplicación web es una biblioteca digital moderna y vanguardista, diseñada para ofrecer una experiencia de usuario atractiva e intuitiva. Permite a los usuarios buscar, explorar y descargar libros de una amplia colección, todo en un entorno visualmente agradable y fácil de usar.

## Características Principales

*   **Autenticación Segura:**
    *   Inicio de sesión mediante Magic Link con Supabase, garantizando una experiencia de autenticación sin contraseñas y altamente segura.
*   **Búsqueda Inteligente:**
    *   Potente buscador que permite encontrar libros por título, autor o género.
*   **Visualización Atractiva:**
    *   Presentación de libros en formato de tarjetas con imágenes de portada, títulos y autores.
*   **Descarga Directa:**
    *   Descarga de libros con un solo clic (implementado con Supabase Storage y políticas de seguridad para proteger el contenido).
*   **Diseño Adaptable:**
    *   Interfaz completamente responsiva que se adapta a dispositivos móviles, tabletas y computadoras de escritorio.
*   **Estilo Moderno:**
    *   Diseño visualmente atractivo con una paleta de colores armoniosa y tipografía moderna.
*   **Backend Robusto:**
    *   Backend desarrollado con Node.js y Express para gestionar las solicitudes y la interacción con la base de datos de Supabase.
*   **Almacenamiento Seguro:**
    *   Almacenamiento de archivos de libros en Supabase Storage, con políticas de seguridad para controlar el acceso.

## Tecnologías Utilizadas

*   **Frontend:**
    *   HTML
    *   CSS (diseño personalizado y adaptable)
    *   JavaScript (lógica de la aplicación)
    *   [@supabase/supabase-js](https://supabase.com/docs/reference/javascript/javascript-client) (cliente JavaScript de Supabase)
*   **Backend:**
    *   Node.js
    *   Express
    *   dotenv (gestión de variables de entorno)
    *   cors (manejo de CORS para desarrollo local)
*   **Base de Datos y Almacenamiento:**
    *   Supabase (autenticación, base de datos PostgreSQL y almacenamiento de archivos)
*   **Despliegue:**
    *   Railway (plataforma de despliegue en la nube)

## Configuración

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/S4mma3l/App.git
    cd App
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**

    *   Crea un archivo `.env` en la raíz del proyecto.
    *   Agrega las siguientes variables de entorno:

        ```
        SUPABASE_URL=[tu_url_de_supabase]
        SUPABASE_ANON_KEY=[tu_anon_key_de_supabase]
        PORT=3000
        ```

    *   Reemplaza `[tu_url_de_supabase]` y `[tu_anon_key_de_supabase]` con tus credenciales de Supabase.

4.  **Ejecuta el servidor:**

    ```bash
    node server.js
    ```

5.  **Abre la aplicación en tu navegador:**

    *   Ve a `http://localhost:3000` (o la URL configurada en tu variable de entorno `PORT`).

## Despliegue en Railway

1.  **Crea una cuenta en [Railway](https://railway.app/).**
2.  **Crea un nuevo proyecto y conecta tu repositorio de GitHub.**
3.  **Agrega las variables de entorno (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT`) en la configuración de Railway.**
4.  **Railway detectará el archivo `railway.json` y construirá y desplegará tu aplicación automáticamente.**

## Estructura del Proyecto

mi-proyecto/
├── .env # Variables de entorno (claves de Supabase, etc.)
├── .gitignore # Archivos a ignorar en Git
├── package.json # Dependencias del proyecto
├── package-lock.json # Información de versiones de dependencias
├── railway.json # Configuración para Railway
├── server.js # Backend Node.js (Express)
├── public/ # Archivos estáticos (HTML, CSS, JS)
│ ├── index.html # Página de inicio (redirección a login)
│ ├── login.html # Formulario de login con Magic Link
│ ├── app.html # Página principal después del login
│ ├── auth/
│ │ └── confirm.html # Página de confirmación de Supabase
│ └── css/
│ │ └── style.css # Estilos CSS
│ └── js/
│ ├── index.js # Lógica para index.html
│ ├── login.js # Lógica para login.html (Supabase)
│ ├── app.js # Lógica para app.html (fetch de datos, etc.)
│ └── confirm.js # Lógica para confirm.html
└── README.md # Este archivo



## Próximos Pasos

Aquí hay algunas ideas para continuar desarrollando tu proyecto:

*   **Implementar un Panel de Administración:** Permite a los administradores agregar, editar y eliminar libros de la base de datos.
*   **Agregar Funcionalidades de Lectura:** Integra un visor de libros para permitir a los usuarios leer los libros directamente en el navegador.
*   **Implementar Interacción Social:** Permite a los usuarios escribir reseñas y calificar los libros.
*   **Agregar Personalización:** Permite a los usuarios elegir entre diferentes temas de interfaz y personalizar la fuente y el tamaño del texto.

## Contribución

¡Las contribuciones son bienvenidas! Si tienes alguna idea para mejorar esta aplicación, no dudes en abrir un "issue" o enviar un "pull request".

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.