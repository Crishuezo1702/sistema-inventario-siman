
const inventarioModel = require('../models/inventarioModel');

// =====================================
// OBTENER TODOS LOS INVENTARIOS
// =====================================
const obtenerInventarios = (req, res) => {
    inventarioModel.obtenerInventarios((error, resultados) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Error al obtener los inventarios'
            });
        }

        res.json(resultados);
    });
};

// =====================================
// OBTENER UN INVENTARIO POR ID
// =====================================
const obtenerInventario = (req, res) => {
    inventarioModel.obtenerInventario(
        req.params.id,
        (error, resultado) => {
            if (error) {
                console.error(error);

                return res.status(500).json({
                    error: 'Error al obtener el inventario'
                });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    error: 'Inventario no encontrado'
                });
            }

            res.json(resultado[0]);
        }
    );
};

// =====================================
// CREAR INVENTARIO
// =====================================
const crearInventario = (req, res) => {
    inventarioModel.crearInventario(req.body, (error, resultado) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Error al crear el inventario'
            });
        }

        res.status(201).json({
            mensaje: 'Inventario creado correctamente',
            id_inventario: resultado.insertId
        });
    });
};

// =====================================
// ACTUALIZAR INVENTARIO
// =====================================
const actualizarInventario = (req, res) => {

    // Primero comprobamos que el inventario exista
    inventarioModel.obtenerInventario(
        req.params.id,
        (error, resultado) => {

            if (error) {
                console.error(error);

                return res.status(500).json({
                    error: 'Error al consultar el inventario'
                });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    error: 'Inventario no encontrado'
                });
            }

            // Si existe, procedemos a actualizarlo
            inventarioModel.actualizarInventario(
                req.params.id,
                req.body,
                (error, resultadoActualizacion) => {

                    if (error) {
                        console.error(error);

                        return res.status(500).json({
                            error: 'Error al actualizar el inventario'
                        });
                    }

                    res.json({
                        mensaje: 'Inventario actualizado correctamente'
                    });
                }
            );
        }
    );
};

// =====================================
// ELIMINAR INVENTARIO
// =====================================
const eliminarInventario = (req, res) => {
    inventarioModel.eliminarInventario(
        req.params.id,
        (error, resultado) => {

            if (error) {
                console.error(error);

                return res.status(500).json({
                    error: 'Error al eliminar el inventario'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Inventario no encontrado'
                });
            }

            res.json({
                mensaje: 'Inventario eliminado correctamente'
            });
        }
    );
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
