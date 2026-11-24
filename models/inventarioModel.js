
const conexion = require('../config/database');

// =====================================
// OBTENER TODOS LOS INVENTARIOS
// =====================================
const obtenerInventarios = (callback) => {
    const sql = `
        SELECT
            i.id_inventario,
            i.id_producto,
            p.nombre AS nombre_producto,
            p.codigo AS codigo_producto,
            i.id_sucursal,
            s.nombre AS nombre_sucursal,
            i.cantidad,
            p.stock_minimo,
            CASE
                WHEN i.cantidad <= p.stock_minimo THEN 'Stock bajo'
                ELSE 'Disponible'
            END AS estado_stock
        FROM inventario i
        INNER JOIN productos p
            ON i.id_producto = p.id_producto
        INNER JOIN sucursales s
            ON i.id_sucursal = s.id_sucursal
        ORDER BY i.id_inventario DESC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultados);
    });
};

// =====================================
// OBTENER UN INVENTARIO POR ID
// =====================================
const obtenerInventario = (id, callback) => {
    const sql = `
        SELECT
            i.id_inventario,
            i.id_producto,
            p.nombre AS nombre_producto,
            p.codigo AS codigo_producto,
            i.id_sucursal,
            s.nombre AS nombre_sucursal,
            i.cantidad,
            p.stock_minimo,
            CASE
                WHEN i.cantidad <= p.stock_minimo THEN 'Stock bajo'
                ELSE 'Disponible'
            END AS estado_stock
        FROM inventario i
        INNER JOIN productos p
            ON i.id_producto = p.id_producto
        INNER JOIN sucursales s
            ON i.id_sucursal = s.id_sucursal
        WHERE i.id_inventario = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};

// =====================================
// CREAR INVENTARIO
// =====================================
const crearInventario = (datos, callback) => {
    const sql = `
        INSERT INTO inventario
        (id_producto, id_sucursal, cantidad)
        VALUES (?, ?, ?)
    `;

    const valores = [
        datos.id_producto,
        datos.id_sucursal,
        datos.cantidad
    ];

    conexion.query(sql, valores, (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};

// =====================================
// ACTUALIZAR INVENTARIO
// =====================================
const actualizarInventario = (id, datos, callback) => {
    const sql = `
        UPDATE inventario
        SET id_producto = ?,
            id_sucursal = ?,
            cantidad = ?
        WHERE id_inventario = ?
    `;

    const valores = [
        datos.id_producto,
        datos.id_sucursal,
        datos.cantidad,
        id
    ];

    conexion.query(sql, valores, (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};

// =====================================
// ELIMINAR INVENTARIO
// =====================================
const eliminarInventario = (id, callback) => {
    const sql = `
        DELETE FROM inventario
        WHERE id_inventario = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};

// =====================================
// EXPORTAR FUNCIONES
// =====================================
module.exports = {
    obtenerInventarios,
    obtenerInventario,
    crearInventario,
    actualizarInventario,
    eliminarInventario
};
