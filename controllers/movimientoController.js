
const movimientoModel = require('../models/movimientoModel');

// ==========================================
// OBTENER TODOS LOS MOVIMIENTOS
// ==========================================

const obtenerMovimientos = (req, res) => {

    movimientoModel.obtenerMovimientos((error, resultados) => {

        if (error) {
            return res.status(500).json({
                error: 'Error al obtener los movimientos'
            });
        }

        res.json(resultados);

    });

};


// ==========================================
// OBTENER MOVIMIENTO POR ID
// ==========================================

const obtenerMovimiento = (req, res) => {

    movimientoModel.obtenerMovimiento(req.params.id, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                error: 'Error al obtener el movimiento'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                error: 'Movimiento no encontrado'
            });
        }

        res.json(resultado[0]);

    });

};


// ==========================================
// CREAR MOVIMIENTO
// ==========================================

const crearMovimiento = (req, res) => {

    movimientoModel.crearMovimiento(req.body, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                error: 'Error al crear el movimiento'
            });
        }

        res.status(201).json({
            mensaje: 'Movimiento creado correctamente',
            id_movimiento: resultado.insertId
        });

    });

};


// ==========================================
// ACTUALIZAR MOVIMIENTO
// ==========================================

const actualizarMovimiento = (req, res) => {

    movimientoModel.obtenerMovimiento(req.params.id, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                error: 'Error al verificar el movimiento'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                error: 'Movimiento no encontrado'
            });
        }

        movimientoModel.actualizarMovimiento(
            req.params.id,
            req.body,
            (error, resultadoActualizacion) => {

                if (error) {
                    return res.status(500).json({
                        error: 'Error al actualizar el movimiento'
                    });
                }

                res.json({
                    mensaje: 'Movimiento actualizado correctamente'
                });

            }
        );

    });

};


// ==========================================
// ELIMINAR MOVIMIENTO
// ==========================================

const eliminarMovimiento = (req, res) => {

    movimientoModel.eliminarMovimiento(req.params.id, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                error: 'Error al eliminar el movimiento'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Movimiento no encontrado'
            });
        }

        res.json({
            mensaje: 'Movimiento eliminado correctamente'
        });

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
