# Sistema de Inventario SIMAN

Sistema web de gestión de inventario desarrollado con **Node.js, Express y MySQL**. Permite administrar productos, categorías, proveedores, sucursales, inventario y movimientos mediante una interfaz web.

## Características principales

- Gestión de productos.
- Administración de categorías.
- Gestión de proveedores.
- Administración de sucursales.
- Consulta y administración del inventario.
- Registro y administración de movimientos.
- Gestión de detalles de movimientos.
- Operaciones CRUD (Crear, Leer, Actualizar y Eliminar).
- Validación de datos mediante middleware.
- Conexión a base de datos MySQL.

## Tecnologías utilizadas

**Backend**
- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

**Frontend**
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Estructura del proyecto

```text
sistema-inventario-siman/
│
├── config/
│   └── database.js
│
├── controllers/
├── middleware/
├── models/
├── routes/
│
├── database/
│   └── sistema_inventario_siman.sql
│
├── public/
│   ├── css/
│   ├── js/
│   └── archivos HTML
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Requisitos previos

Antes de ejecutar el proyecto, es necesario tener instalado:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Git](https://git-scm.com/)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Crishuezo1702/sistema-inventario-siman.git
```

### 2. Entrar al directorio

```bash
cd sistema-inventario-siman
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Importar la base de datos

El proyecto incluye el script SQL ubicado en:

```text
database/sistema_inventario_siman.sql
```

Para importarlo utilizando MySQL Workbench:

1. Abrir MySQL Workbench y conectarse al servidor local.
2. Seleccionar **Server → Data Import**.
3. Seleccionar **Import from Self-Contained File**.
4. Buscar el archivo `database/sistema_inventario_siman.sql`.
5. Iniciar la importación con **Start Import**.
6. Actualizar la sección SCHEMAS y comprobar que aparezca `sistema_inventario_siman`.

El script contiene la estructura de las tablas, sus relaciones y datos de prueba.

### 5. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las credenciales de conexión a MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_inventario_siman
```

**Importante:** utilizar las credenciales correspondientes al servidor MySQL local. No subir el archivo `.env` a GitHub.

### 6. Ejecutar el servidor

```bash
node server.js
```

Cuando el servidor esté funcionando, abrir el navegador en:

```text
http://localhost:8080
```

## Base de datos

El sistema utiliza una base de datos MySQL compuesta por las siguientes nueve tablas:

1. `roles`
2. `usuarios`
3. `categorias`
4. `proveedores`
5. `sucursales`
6. `productos`
7. `inventario`
8. `movimientos_inventario`
9. `detalle_movimiento`

El modelo de datos utiliza claves primarias y foráneas para relacionar la información entre las tablas.

## Autor

**Cristian Marcelo López Huezo**

Estudiante de Ingeniería en Ciencias de la Computación.

GitHub: [@Crishuezo1702](https://github.com/Crishuezo1702)

Repositorio: [Sistema de Inventario SIMAN](https://github.com/Crishuezo1702/sistema-inventario-siman)

---

Proyecto desarrollado con fines académicos y de aprendizaje, aplicando conocimientos de desarrollo backend, bases de datos y desarrollo web.