
const conexion = require('../config/database');

const validarDetalleMovimiento = (req, res, next) => {

    const {
        id_movimiento,
        id_producto,
        cantidad
    } = req.body;


    // 1. Validar campos obligatorios

    if (
        id_movimiento === undefined || id_movimiento === null ||
        id_producto === undefined || id_producto === null ||
        cantidad === undefined || cantidad === null
    ) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios'
        });
    }


    // 2. Validar id_movimiento

    if (!Number.isInteger(id_movimiento) || id_movimiento <= 0) {
        return res.status(400).json({
            error: 'El id_movimiento debe ser un entero positivo'
        });
    }


    // 3. Validar id_producto

    if (!Number.isInteger(id_producto) || id_producto <= 0) {
        return res.status(400).json({
            error: 'El id_producto debe ser un entero positivo'
        });
    }


    // 4. Validar cantidad

    if (!Number.isInteger(cantidad)) {
        return res.status(400).json({
            error: 'La cantidad debe ser un numero entero'
        });
    }

    if (cantidad <= 0) {
        return res.status(400).json({
            error: 'La cantidad debe ser mayor que 0'
        });
    }


    // 5. Validar ID cuando sea PUT

    if (req.method === 'PUT') {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El id del detalle debe ser un entero positivo'
            });
        }

    }


    // 6. Comprobar que el movimiento existe

    conexion.query(
        `
        SELECT id_movimiento
        FROM movimientos_inventario
        WHERE id_movimiento = ?
        `,
        [id_movimiento],
        (error, resultados) => {

            if (error) {
                return res.status(500).json({
                    error: 'Error al comprobar el movimiento'
                });
            }

            if (resultados.length === 0) {
                return res.status(400).json({
                    error: 'El movimiento no existe'
                });
            }


            // 7. Comprobar que el producto existe y está activo

            conexion.query(
                `
                SELECT id_producto
                FROM productos
                WHERE id_producto = ?
                AND activo = TRUE
                `,
                [id_producto],
                (error, resultados) => {

                    if (error) {
                        return res.status(500).json({
                            error: 'Error al comprobar el producto'
                        });
                    }

                    if (resultados.length === 0) {
                        return res.status(400).json({
                            error: 'El producto no existe o está inactivo'
                        });
                    }

                    next();

                }
            );

        }
    );

};

module.exports = validarDetalleMovimiento;
