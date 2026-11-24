
const conexion = require('../config/database');

// ==========================================
// OBTENER TODOS LOS MOVIMIENTOS
// ==========================================

const obtenerMovimientos = (callback) => {

    const sql = `
        SELECT *
        FROM movimientos_inventario
        ORDER BY fecha_movimiento DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultados);

    });

};


// ==========================================
// OBTENER MOVIMIENTO POR ID
// ==========================================

const obtenerMovimiento = (id, callback) => {

    const sql = `
        SELECT *
        FROM movimientos_inventario
        WHERE id_movimiento = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultado);

    });

};


// ==========================================
// CREAR MOVIMIENTO
// ==========================================

const crearMovimiento = (datos, callback) => {

    const sql = `
        INSERT INTO movimientos_inventario
        (tipo, id_sucursal, id_usuario, observacion)
        VALUES (?, ?, ?, ?)
    `;

    const valores = [
        datos.tipo,
        datos.id_sucursal,
        datos.id_usuario,
        datos.observacion
    ];

    conexion.query(sql, valores, (error, resultado) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultado);

    });

};


// ==========================================
// ACTUALIZAR MOVIMIENTO
// ==========================================

const actualizarMovimiento = (id, datos, callback) => {

    const sql = `
        UPDATE movimientos_inventario
        SET tipo = ?,
            id_sucursal = ?,
            id_usuario = ?,
            observacion = ?
        WHERE id_movimiento = ?
    `;

    const valores = [
        datos.tipo,
        datos.id_sucursal,
        datos.id_usuario,
        datos.observacion,
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
// ELIMINAR MOVIMIENTO
// ==========================================

const eliminarMovimiento = (id, callback) => {

    const sql = `
        DELETE FROM movimientos_inventario
        WHERE id_movimiento = ?
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
    obtenerMovimientos,
    obtenerMovimiento,
    crearMovimiento,
    actualizarMovimiento,
    eliminarMovimiento
};
