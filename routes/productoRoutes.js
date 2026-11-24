const express = require('express')

const router = express.Router()

const productoController = require('../controllers/productoController')

const categoriaController = require('../controllers/categoriaController')

const proveedorController = require('../controllers/proveedorController')

const usuarioController = require('../controllers/usuarioController')

const rolController = require('../controllers/rolController')

const sucursalController = require('../controllers/sucursalController')

const inventarioController = require('../controllers/inventarioController')

const movimientoController = require('../controllers/movimientoController')

const detalleMovimientoController = require('../controllers/detalleMovimientoController')

const validarProducto = require('../middleware/validarProducto')

const validarUsuario = require('../middleware/validarUsuario')

const validarProveedor = require('../middleware/validarProveedor')

const validarSucursal = require('../middleware/validarSucursal')

const validarCategoria = require('../middleware/validarCategoria')

const validarRol = require('../middleware/validarRol')

const validarInventario = require('../middleware/validarInventario')

const validarMovimiento = require('../middleware/validarMovimiento')

const validarDetalleMovimiento = require ('../middleware/validarDetalleMovimiento')

const reportesRoutes = require('./reportesRoutes')

router.get('/productos', productoController.obtenerProductos)

router.get('/productos/:id', productoController.obtenerProducto)

router.post('/productos', validarProducto, productoController.crearProducto);

router.put('/productos/:id', productoController.actualizarProducto)

router.delete('/productos/:id', productoController.eliminarProducto)

router.get('/categorias', categoriaController.obtenerCategorias)

router.get('/categorias/:id', categoriaController.obtenerCategoria)

router.post('/categorias', validarCategoria,  categoriaController.crearCategoria)

router.put('/categorias/:id', validarCategoria, categoriaController.actualizarCategoria)

router.delete('/categorias/:id', categoriaController.eliminarCategoria)

router.get('/proveedores', proveedorController.obtenerProveedores)

router.get('/proveedores/:id', proveedorController.obtenerProveedor)

router.post('/proveedores', validarProveedor, proveedorController.crearProveedor)

router.put('/proveedores/:id', validarProveedor,proveedorController.actualizarProveedor)

router.delete('/proveedores/:id', proveedorController.eliminarProveedor)

router.get('/usuarios', usuarioController.obtenerUsuarios)

router.get('/usuarios/:id', usuarioController.obtenerUsuario)

router.post('/usuarios', validarUsuario, usuarioController.crearUsuario)

router.put('/usuarios/:id', validarUsuario, usuarioController.actualizarUsuario)

router.delete('/usuarios/:id', usuarioController.eliminarUsuario)

router.get('/roles', rolController.obtenerRoles)

router.get('/roles/:id', rolController.obtenerRol)

router.post('/roles', validarRol,  rolController.crearRol)

router.put('/roles/:id',validarRol,  rolController.actualizarRol)

router.delete('/roles/:id', rolController.eliminarRol)

router.get('/sucursales', sucursalController.obtenerSucursales)

router.get('/sucursales/:id', sucursalController.obtenerSucursal)

router.post('/sucursales', validarSucursal, sucursalController.crearSucursal)

router.put('/sucursales/:id', validarSucursal, sucursalController.actualizarSucursal)

router.delete('/sucursales/:id', sucursalController.eliminarSucursal)

router.get('/inventario', inventarioController.obtenerInventarios)

router.get('/inventario/:id', inventarioController.obtenerInventario)

router.post('/inventario', validarInventario, inventarioController.crearInventario)

router.put('/inventario/:id', validarInventario, inventarioController.actualizarInventario)

router.delete('/inventario/:id', inventarioController.eliminarInventario)

router.get('/movimientos', movimientoController.obtenerMovimientos)

router.get('/movimientos/:id', movimientoController.obtenerMovimiento)

router.post('/movimientos', validarMovimiento,  movimientoController.crearMovimiento)

router.put('/movimientos/:id', validarMovimiento,  movimientoController.actualizarMovimiento)

router.delete('/movimientos/:id', movimientoController.eliminarMovimiento)

router.get('/detalles-movimiento', detalleMovimientoController.obtenerDetalles)

router.get('/detalles-movimiento/:id', detalleMovimientoController.obtenerDetalle)

router.post('/detalles-movimiento', validarDetalleMovimiento,  detalleMovimientoController.crearDetalle)

router.put('/detalles-movimiento/:id',  validarDetalleMovimiento, detalleMovimientoController.actualizarDetalle)

router.delete('/detalles-movimiento/:id', detalleMovimientoController.eliminarDetalle)

router.use(reportesRoutes)

module.exports = router