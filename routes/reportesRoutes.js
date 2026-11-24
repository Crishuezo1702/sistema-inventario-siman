const express = require('express')

const router = express.Router()

const reportesController = require('../controllers/reportesController')

router.get(
    '/reportes/productos-categoria-proveedor',
    reportesController.obtenerProductosConCategoriaProveedor
)

router.get(
    '/reportes/inventario-por-sucursal',
    reportesController.obtenerInventarioPorSucursal
)

router.get(
    '/reportes/productos-para-reposicion',
    reportesController.obtenerProductosParaReposicion
)

router.get(
    '/reportes/movimientos-con-detalles',
    reportesController.obtenerMovimientosConDetalles
)

router.get(
    '/reportes/entradas-salidas-por-producto',
    reportesController.obtenerEntradasSalidasPorProducto
)

router.get(
    '/reportes/resumen-entradas-salidas-por-sucursal',
    reportesController.obtenerResumenEntradasSalidasPorSucursal
)

router.get(
    '/reportes/stock-total-por-producto',
    reportesController.obtenerStockTotalPorProducto
)

router.get(
    '/reportes/valor-inventario-por-sucursal',
    reportesController.obtenerValorInventarioPorSucursal
)

router.get(
    '/reportes/top-cinco-productos-por-valor',
    reportesController.obtenerTopCincoProductosPorValor
)

router.get(
    '/reportes/inventario-por-categoria',
    reportesController.obtenerInventarioPorCategoria
)

module.exports = router