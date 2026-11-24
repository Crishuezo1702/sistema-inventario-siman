
const detalleMovimientoModel = require('../models/detalleMovimientoModel');

// ==========================================
// OBTENER TODOS LOS DETALLES
// ==========================================

const obtenerDetalles = (req, res) => {

    detalleMovimientoModel.obtenerDetalles((error, resultados) => {

        if (error) {
            return res.status(500).json({
                error: 'Error al obtener los detalles'
            });
        }

        res.json(resultados);

    });

};


// ==========================================
// OBTENER DETALLE POR ID
// ==========================================

const obtenerDetalle = (req, res) => {

    detalleMovimientoModel.obtenerDetalle(
        req.params.id,
        (error, resultado) => {

            if (error) {
                return res.status(500).json({
                    error: 'Error al obtener el detalle'
                });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    error: 'Detalle no encontrado'
                });
            }

            res.json(resultado[0]);

        }
    );

};


// ==========================================
// CREAR DETALLE
// ==========================================

const crearDetalle = (req, res) => {

    detalleMovimientoModel.crearDetalle(req.body, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                error: 'Error al crear el detalle'
            });
        }

        res.status(201).json({
            mensaje: 'Detalle creado correctamente',
            id_detalle: resultado.insertId
        });

    });

};


// ==========================================
// ACTUALIZAR DETALLE
// ==========================================

const actualizarDetalle = (req, res) => {

    detalleMovimientoModel.obtenerDetalle(
        req.params.id,
        (error, resultado) => {

            if (error) {
                return res.status(500).json({
                    error: 'Error al verificar el detalle'
                });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    error: 'Detalle no encontrado'
                });
            }

            detalleMovimientoModel.actualizarDetalle(
                req.params.id,
                req.body,
                (error, resultadoActualizacion) => {

                    if (error) {
                        return res.status(500).json({
                            error: 'Error al actualizar el detalle'
                        });
                    }

                    res.json({
                        mensaje: 'Detalle actualizado correctamente'
                    });

                }
            );

        }
    );

};


// ==========================================
// ELIMINAR DETALLE
// ==========================================

const eliminarDetalle = (req, res) => {

    detalleMovimientoModel.eliminarDetalle(
        req.params.id,
        (error, resultado) => {

            if (error) {
                return res.status(500).json({
                    error: 'Error al eliminar el detalle'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Detalle no encontrado'
                });
            }

            res.json({
                mensaje: 'Detalle eliminado correctamente'
            });

        }
    );

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
