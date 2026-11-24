
const conexion = require('../config/database');

const validarInventario = (req, res, next) => {

    const {
        id_producto,
        id_sucursal,
        cantidad
    } = req.body;

    // Validar campos obligatorios
    if (
        id_producto === undefined || id_producto === null ||
        id_sucursal === undefined || id_sucursal === null ||
        cantidad === undefined || cantidad === null
    ) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios'
        });
    }

    // Validar ID del producto
    if (!Number.isInteger(id_producto) || id_producto <= 0) {
        return res.status(400).json({
            error: 'El id_producto debe ser un entero positivo'
        });
    }

    // Validar ID de la sucursal
    if (!Number.isInteger(id_sucursal) || id_sucursal <= 0) {
        return res.status(400).json({
            error: 'El id_sucursal debe ser un entero positivo'
        });
    }

    // Validar cantidad
    if (!Number.isInteger(cantidad) || cantidad < 0) {
        return res.status(400).json({
            error: 'La cantidad debe ser un entero mayor o igual a cero'
        });
    }

    // Validar ID del inventario en PUT
    if (req.method === 'PUT') {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El id del inventario debe ser un entero positivo'
            });
        }
    }

    // Comprobar que el producto exista y esté activo
    conexion.query(
        `SELECT id_producto
         FROM productos
         WHERE id_producto = ? AND activo = TRUE`,
        [id_producto],
        (error, resultados) => {

            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al comprobar el producto'
                });
            }

            if (resultados.length === 0) {
                return res.status(400).json({
                    error: 'El producto no existe o está inactivo'
                });
            }

            // Comprobar que la sucursal exista y esté activa
            conexion.query(
                `SELECT id_sucursal
                 FROM sucursales
                 WHERE id_sucursal = ? AND activo = TRUE`,
                [id_sucursal],
                (error, resultados) => {

                    if (error) {
                        console.error(error);
                        return res.status(500).json({
                            error: 'Error al comprobar la sucursal'
                        });
                    }

                    if (resultados.length === 0) {
                        return res.status(400).json({
                            error: 'La sucursal no existe o está inactiva'
                        });
                    }

                    // Comprobar inventario duplicado
                    let sqlDuplicado;
                    let valoresDuplicado;

                    if (req.method === 'PUT') {

                        sqlDuplicado = `
                            SELECT id_inventario
                            FROM inventario
                            WHERE id_producto = ?
                            AND id_sucursal = ?
                            AND id_inventario != ?
                        `;

                        valoresDuplicado = [
                            id_producto,
                            id_sucursal,
                            Number(req.params.id)
                        ];

                    } else {

                        sqlDuplicado = `
                            SELECT id_inventario
                            FROM inventario
                            WHERE id_producto = ?
                            AND id_sucursal = ?
                        `;

                        valoresDuplicado = [
                            id_producto,
                            id_sucursal
                        ];
                    }

                    conexion.query(
                        sqlDuplicado,
                        valoresDuplicado,
                        (error, resultados) => {

                            if (error) {
                                console.error(error);
                                return res.status(500).json({
                                    error: 'Error al comprobar el inventario'
                                });
                            }

                            if (resultados.length > 0) {
                                return res.status(400).json({
                                    error: 'Ya existe inventario para ese producto y sucursal'
                                });
                            }

                            next();
                        }
                    );
                }
            );
        }
    );
};

module.exports = validarInventario;
