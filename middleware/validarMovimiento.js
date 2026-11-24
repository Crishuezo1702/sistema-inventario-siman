
const conexion = require('../config/database');

const validarMovimiento = (req, res, next) => {

    const {
        tipo,
        id_sucursal,
        id_usuario,
        observacion
    } = req.body;


    // 1. Validar campos obligatorios

    if (
        tipo === undefined || tipo === null ||
        id_sucursal === undefined || id_sucursal === null ||
        id_usuario === undefined || id_usuario === null
    ) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios'
        });
    }


    // 2. Validar tipo de movimiento

    if (typeof tipo !== 'string') {
        return res.status(400).json({
            error: 'El tipo debe ser texto'
        });
    }

    if (tipo !== 'ENTRADA' && tipo !== 'SALIDA') {
        return res.status(400).json({
            error: 'El tipo debe ser ENTRADA o SALIDA'
        });
    }


    // 3. Validar id_sucursal

    if (!Number.isInteger(id_sucursal) || id_sucursal <= 0) {
        return res.status(400).json({
            error: 'El id_sucursal debe ser un entero positivo'
        });
    }


    // 4. Validar id_usuario

    if (!Number.isInteger(id_usuario) || id_usuario <= 0) {
        return res.status(400).json({
            error: 'El id_usuario debe ser un entero positivo'
        });
    }


    // 5. Validar observacion

    if (observacion !== undefined && observacion !== null) {

        if (typeof observacion !== 'string') {
            return res.status(400).json({
                error: 'La observacion debe ser texto'
            });
        }

        if (observacion.length > 255) {
            return res.status(400).json({
                error: 'La observacion no puede tener mas de 255 caracteres'
            });
        }

    }


    // 6. Validar ID cuando sea PUT

    if (req.method === 'PUT') {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El id del movimiento debe ser un entero positivo'
            });
        }

    }


    // 7. Comprobar que la sucursal existe y está activa

    conexion.query(
        `
        SELECT id_sucursal
        FROM sucursales
        WHERE id_sucursal = ?
        AND activo = TRUE
        `,
        [id_sucursal],
        (error, resultados) => {

            if (error) {
                return res.status(500).json({
                    error: 'Error al comprobar la sucursal'
                });
            }

            if (resultados.length === 0) {
                return res.status(400).json({
                    error: 'La sucursal no existe o está inactiva'
                });
            }


            // 8. Comprobar que el usuario existe y está activo

            conexion.query(
                `
                SELECT id_usuario
                FROM usuarios
                WHERE id_usuario = ?
                AND activo = TRUE
                `,
                [id_usuario],
                (error, resultados) => {

                    if (error) {
                        return res.status(500).json({
                            error: 'Error al comprobar el usuario'
                        });
                    }

                    if (resultados.length === 0) {
                        return res.status(400).json({
                            error: 'El usuario no existe o está inactivo'
                        });
                    }

                    next();

                }
            );

        }
    );

};

module.exports = validarMovimiento;
