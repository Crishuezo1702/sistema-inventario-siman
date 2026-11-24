
const conexion = require('../config/database');

// =====================================
// OBTENER TODAS LAS SUCURSALES
// =====================================
const obtenerSucursales = (callback) => {
    conexion.query(
        'SELECT * FROM sucursales',
        (error, resultados) => {
            if (error) {
                return callback(error);
            }

            callback(null, resultados);
        }
    );
};

// =====================================
// OBTENER UNA SUCURSAL POR ID
// =====================================
const obtenerSucursal = (id, callback) => {
    conexion.query(
        'SELECT * FROM sucursales WHERE id_sucursal = ?',
        [id],
        (error, resultado) => {
            if (error) {
                return callback(error);
            }

            callback(null, resultado);
        }
    );
};

// =====================================
// CREAR UNA SUCURSAL
// =====================================
const crearSucursal = (datos, callback) => {
    const sql = `
        INSERT INTO sucursales
        (nombre, direccion, telefono, activo)
        VALUES (?, ?, ?, ?)
    `;

    const valores = [
        datos.nombre,
        datos.direccion,
        datos.telefono,
        datos.activo ?? true
    ];

    conexion.query(sql, valores, (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};

// =====================================
// ACTUALIZAR UNA SUCURSAL
// =====================================
const actualizarSucursal = (id, datos, callback) => {
    const sql = `
        UPDATE sucursales
        SET nombre = ?,
            direccion = ?,
            telefono = ?,
            activo = ?
        WHERE id_sucursal = ?
    `;

    const valores = [
        datos.nombre,
        datos.direccion,
        datos.telefono,
        datos.activo ?? true,
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
// ELIMINAR UNA SUCURSAL
// =====================================
const eliminarSucursal = (id, callback) => {
    const sql = `
        DELETE FROM sucursales
        WHERE id_sucursal = ?
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
    obtenerSucursales,
    obtenerSucursal,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
};
