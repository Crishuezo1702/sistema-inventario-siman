# Sistema de Inventario SIMAN

Sistema web de gestión de inventario desarrollado con **Node.js, Express y MySQL**. Permite administrar productos, categorías, proveedores, sucursales, inventario y movimientos mediante una interfaz web.

## Características principales

- Gestión de productos.
- Administración de categorías.
- Gestión de proveedores.
- Administración de sucursales.
- Consulta y administración del inventario.
- Registro y administración de movimientos de inventario.
- Gestión de detalles de movimientos.
- Operaciones CRUD (Crear, Leer, Actualizar y Eliminar).
- Validación de datos mediante middleware.
- Conexión a base de datos MySQL.

## Tecnologías utilizadas

### Backend
- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

### Frontend
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
│   ├── categoriaController.js
│   ├── detalleMovimientoController.js
│   ├── inventarioController.js
│   ├── movimientoController.js
│   ├── productoController.js
│   ├── proveedorController.js
│   ├── reportesController.js
│   ├── rolController.js
│   ├── sucursalController.js
│   └── usuarioController.js
│
├── middleware/
│
├── models/
│
├── public/
│   ├── css/
│   ├── js/
│   └── *.html
│
├── routes/
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Crishuezo1702/sistema-inventario-siman.git
```

2. Entrar al directorio:

```bash
cd sistema-inventario-siman
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear la base de datos MySQL:

```sql
CREATE DATABASE sistema_inventario_siman;
```

5. Crear un archivo `.env` en la raíz del proyecto con las credenciales de tu base de datos:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_inventario_siman
```

6. Configurar las tablas de la base de datos antes de iniciar la aplicación.

## Ejecución

Iniciar el servidor con:

```bash
node server.js
```

Cuando el servidor esté funcionando, acceder desde el navegador:

```text
http://localhost:8080
```

## Autor

**Cristian Marcelo López Huezo**

Estudiante de Ingeniería en Ciencias de la Computación.

GitHub: [@Crishuezo1702](https://github.com/Crishuezo1702)

---

Proyecto desarrollado con fines académicos y de aprendizaje, aplicando conocimientos de desarrollo backend, bases de datos y desarrollo web.
