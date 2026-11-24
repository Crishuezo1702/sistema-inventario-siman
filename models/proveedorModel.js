
const conexion = require('../config/database');

const obtenerProveedores = (callback) => {
    conexion.query(
        'SELECT * FROM proveedores',
        (error, resultados) => {
            if (error) {
                return callback(error);
            }

            callback(null, resultados);
        }
    );
};

const obtenerProveedor = (id, callback) => {
    conexion.query(
        'SELECT * FROM proveedores WHERE id_proveedor = ?',
        [id],
        (error, resultado) => {
            if (error) {
                return callback(error);
            }

            callback(null, resultado);
        }
    );
};

const crearProveedor = (datos, callback) => {
    const sql = `
        INSERT INTO proveedores
        (nombre, contacto, telefono, correo, direccion, activo)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        datos.nombre,
        datos.contacto,
        datos.telefono,
        datos.correo,
        datos.direccion,
        datos.activo ?? true
    ];

    conexion.query(sql, valores, (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};

const actualizarProveedor = (id, datos, callback) => {
    const sql = `
        UPDATE proveedores
        SET nombre = ?,
            contacto = ?,
            telefono = ?,
            correo = ?,
            direccion = ?,
            activo = ?
        WHERE id_proveedor = ?
    `;

    const valores = [
        datos.nombre,
        datos.contacto,
        datos.telefono,
        datos.correo,
        datos.direccion,
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

const eliminarProveedor = (id, callback) => {
    const sql = `
        DELETE FROM proveedores
        WHERE id_proveedor = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};

module.exports = {
    obtenerProveedores,
    obtenerProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
};
