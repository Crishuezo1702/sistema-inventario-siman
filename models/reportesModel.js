const conexion = require('../config/database')

const obtenerProductosConCategoriaProveedor = (callback) =>{

    const sql =  `
        SELECT
            p.id_producto,
            p.codigo,
            p.nombre AS producto,
            p.precio,
            p.stock_minimo,
            c.nombre AS categoria,
            pr.nombre AS proveedor
        FROM productos p
        INNER JOIN categorias c
            on p.id_categoria = c.id_categoria
        INNER JOIN proveedores pr
            ON p.id_proveedor = pr.id_proveedor
         `
    
    conexion.query(sql, (error, resultados)  =>{
        callback(error, resultados)
    })
}

const obtenerInventarioPorSucursal = (callback) =>{
    
    const sql =  `
        SELECT 
            p.codigo,
            p.nombre As producto,
            s.nombre AS sucursal,
            i.cantidad AS stock_actual,
            p.stock_minimo,
            CASE
                WHEN i.cantidad <= p.stock_minimo
                    THEN 'REPOSICION NECESARIA'
                ELSE 'STOCK SUFICIENTE'
            END AS estado_Stock
        FROM inventario i
        INNER JOIN productos p
            ON i.id_producto = p.id_producto
        INNER JOIN sucursales s
            ON i.id_sucursal = s.id_sucursal
        ORDER BY s.nombre, p.nombre
         `
    
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

const obtenerProductosParaReposicion = (callback) =>{

    const sql =  `
        SELECT 
            p.codigo,
            p.nombre AS producto,
            s.nombre AS sucursal,
            i.cantidad AS stock_actual,
            p.stock_minimo
        FROM inventario i
        INNER JOIN productos p
            ON i.id_producto = p.id_producto
        INNER JOIN sucursales s
            on i.id_sucursal = s.id_sucursal
        WHERE i.cantidad <= p.stock_minimo
        ORDER BY s.nombre, p.nombre
         `
    
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

const obtenerMovimientosConDetalles = (callback) =>{

    const sql = `
        SELECT
            m.id_movimiento,
            m.fecha_movimiento,
            m.tipo,
            s.nombre AS sucursal,
            u.nombre AS usuario,
            p.codigo,
            p.nombre AS producto,
            d.cantidad,
            m.observacion
        FROM movimientos_inventario m
        INNER JOIN sucursales s
            ON m.id_sucursal = s.id_sucursal
        INNER JOIN usuarios u
            ON m.id_usuario = u.id_usuario
        LEFT JOIN detalle_movimiento d
            ON m.id_movimiento = d.id_movimiento
        LEFT JOIN productos p
            ON d.id_producto = p.id_producto
        ORDER BY m.fecha_movimiento DESC
        `
    
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

const obtenerEntradasSalidasPorProducto = (callback) =>{

    const sql =  `
        SELECT 
            s.nombre AS sucursal,
            p.codigo,
            p.nombre AS producto,
            SUM(
                CASE
                    WHEN m.tipo = 'ENTRADA' THEN d.cantidad
                    ELSE 0
                END   
                )AS total_entradas,
                SUM(
                    CASE
                        WHEN m.tipo = 'SALIDA' THEN d.cantidad
                        ELSE 0
                        END
                )AS total_salidas
            FROM detalle_movimiento d
            INNER JOIN movimientos_inventario m
                ON d.id_movimiento = m.id_movimiento
            INNER JOIN sucursales s
                ON m.id_sucursal = s.id_sucursal
            INNER JOIN productos p
                ON d.id_producto = p.id_producto
            GROUP BY
                s.id_sucursal,
                s.nombre,
                p.id_producto,
                p.codigo,
                p.nombre
            ORDER BY s.nombre, p.nombre
            `
    conexion.query(sql, (error, resultados)  =>{
        callback(error, resultados)
    }) 
}

const obtenerResumenEntradasSalidasPorSucursal = (callback) =>{

    const sql = `
        SELECT 
            s.nombre AS sucursal,
            SUM(
                CASE
                    WHEN m.tipo = 'ENTRADA'
                        THEN COALESCE(d.cantidad, 0)
                    ELSE 0
                END
            )AS total_entradas,
            SUM(
                CASE
                    WHEN m.tipo = 'SALIDA'
                        THEN COALESCE(d.cantidad,0)
                    ELSE 0
                END     
            )AS total_salidas
        FROM sucursales s
        LEFT JOIN movimientos_inventario m
            ON s.id_sucursal = m.id_sucursal
        LEFT JOIN detalle_movimiento d
            ON m.id_movimiento = d.id_movimiento
        GROUP BY
            s.id_sucursal,
            s.nombre
        `
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

const obtenerStockTotalPorProducto = (callback) =>{

    const sql = `
        SELECT
            p.codigo,
            p.nombre AS producto,
            SUM(i.cantidad) AS stock_total
        FROM productos p
        INNER JOIN inventario i
            ON p.id_producto = i.id_producto
        GROUP BY
            p.id_producto,
            p.codigo,
            p.nombre
        ORDER BY stock_total DESC
        `
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

const obtenerValorInventarioPorSucursal = (callback) =>{

    const sql = `
        SELECT
            s.nombre AS sucursal,
            SUM(i.cantidad) AS unidades_totales,
            ROUND(SUM(i.cantidad * p.precio),2) AS valor_inventario
        FROM inventario i
        INNER JOIN productos p
            ON i.id_producto = p.id_producto
        INNER JOIN sucursales s
            ON i.id_sucursal = s.id_sucursal
        GROUP BY
            s.id_sucursal,
            s.nombre
        ORDER BY valor_inventario DESC
        `
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

const obtenerTopCincoProductosPorValor = (callback) =>{

    const sql = `
        SELECT 
            p.codigo,
            p.nombre AS producto,
            SUM(i.cantidad) AS unidades_totales,
            ROUND(SUM(i.cantidad * p.precio), 2) AS valor_total
        FROM productos p
        INNER JOIN inventario i
            ON p.id_producto = i.id_producto
        GROUP BY
            p.id_producto,
            p.codigo,
            p.nombre
        ORDER BY valor_total DESC
        LIMIT 5
        `
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

const obtenerInventarioPorCategoria = (callback) =>{

    const sql =  `
        SELECT 
            c.nombre AS categoria,
            SUM(i.cantidad) AS unidades_totales,
            ROUND(SUM(i.cantidad * p.precio), 2) AS valor_inventario
        FROM categorias c
        INNER JOIN productos p
            ON c.id_categoria = p.id_categoria
        INNER JOIN inventario i
            ON p.id_producto = i.id_producto
        GROUP BY
            c.id_categoria,
            c.nombre
        ORDER BY valor_inventario DESC
         `
    
    conexion.query(sql, (error, resultados) =>{
        callback(error, resultados)
    })
}

module.exports = {
    obtenerProductosConCategoriaProveedor,
    obtenerInventarioPorSucursal,
    obtenerProductosParaReposicion,
    obtenerMovimientosConDetalles,
    obtenerEntradasSalidasPorProducto,
    obtenerResumenEntradasSalidasPorSucursal,
    obtenerStockTotalPorProducto,
    obtenerValorInventarioPorSucursal,
    obtenerTopCincoProductosPorValor,
    obtenerInventarioPorCategoria
}