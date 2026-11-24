
const conexion = require('../config/database');

// ==========================================
// OBTENER TODOS LOS DETALLES
// ==========================================

const obtenerDetalles = (callback) => {

    const sql = `
        SELECT
            d.id_detalle,
            d.id_movimiento,
            m.tipo AS tipo_movimiento,
            m.id_sucursal,
            m.id_usuario,
            m.fecha_movimiento,
            d.id_producto,
            p.codigo AS codigo_producto,
            p.nombre AS nombre_producto,
            d.cantidad
        FROM detalle_movimiento d
        INNER JOIN movimientos_inventario m
            ON d.id_movimiento = m.id_movimiento
        INNER JOIN productos p
            ON d.id_producto = p.id_producto
        ORDER BY d.id_detalle DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultados);

    });

};


// ==========================================
// OBTENER DETALLE POR ID
// ==========================================

const obtenerDetalle = (id, callback) => {

    const sql = `
        SELECT
            d.id_detalle,
            d.id_movimiento,
            m.tipo AS tipo_movimiento,
            m.id_sucursal,
            m.id_usuario,
            m.fecha_movimiento,
            d.id_producto,
            p.codigo AS codigo_producto,
            p.nombre AS nombre_producto,
            d.cantidad
        FROM detalle_movimiento d
        INNER JOIN movimientos_inventario m
            ON d.id_movimiento = m.id_movimiento
        INNER JOIN productos p
            ON d.id_producto = p.id_producto
        WHERE d.id_detalle = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultado);

    });

};


// ==========================================
// CREAR DETALLE
// ==========================================

const crearDetalle = (datos, callback) => {

    const sql = `
        INSERT INTO detalle_movimiento
        (id_movimiento, id_producto, cantidad)
        VALUES (?, ?, ?)
    `;

    const valores = [
        datos.id_movimiento,
        datos.id_producto,
        datos.cantidad
    ];

    conexion.query(sql, valores, (error, resultado) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultado);

    });

};


// ==========================================
// ACTUALIZAR DETALLE
// ==========================================

const actualizarDetalle = (id, datos, callback) => {

    const sql = `
        UPDATE detalle_movimiento
        SET
            id_movimiento = ?,
            id_producto = ?,
            cantidad = ?
        WHERE id_detalle = ?
    `;

    const valores = [
        datos.id_movimiento,
        datos.id_producto,
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


// ==========================================
// ELIMINAR DETALLE
// ==========================================

const eliminarDetalle = (id, callback) => {

    const sql = `
        DELETE FROM detalle_movimiento
        WHERE id_detalle = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultado);

    });

};


// ==========================================
// EXPORTAR FUNCIONES
// ==========================================

module.exports = {
    obtenerDetalles,
    obtenerDetalle,
    crearDetalle,
    actualizarDetalle,
    eliminarDetalle
};
