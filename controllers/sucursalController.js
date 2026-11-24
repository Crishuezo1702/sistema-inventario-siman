
const sucursalModel = require('../models/sucursalModel');

// =====================================
// OBTENER TODAS LAS SUCURSALES
// =====================================
const obtenerSucursales = (req, res) => {
    sucursalModel.obtenerSucursales((error, resultados) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Error al obtener las sucursales'
            });
        }

        res.json(resultados);
    });
};

// =====================================
// OBTENER UNA SUCURSAL POR ID
// =====================================
const obtenerSucursal = (req, res) => {
    sucursalModel.obtenerSucursal(req.params.id, (error, resultado) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Error al obtener la sucursal'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                error: 'Sucursal no encontrada'
            });
        }

        res.json(resultado[0]);
    });
};

// =====================================
// CREAR UNA SUCURSAL
// =====================================
const crearSucursal = (req, res) => {
    sucursalModel.crearSucursal(req.body, (error, resultado) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Error al crear la sucursal'
            });
        }

        res.status(201).json({
            mensaje: 'Sucursal creada correctamente',
            id_sucursal: resultado.insertId
        });
    });
};

// =====================================
// ACTUALIZAR UNA SUCURSAL
// =====================================
const actualizarSucursal = (req, res) => {
    sucursalModel.actualizarSucursal(
        req.params.id,
        req.body,
        (error, resultado) => {
            if (error) {
                console.error(error);

                return res.status(500).json({
                    error: 'Error al actualizar la sucursal'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Sucursal no encontrada'
                });
            }

            res.json({
                mensaje: 'Sucursal actualizada correctamente'
            });
        }
    );
};

// =====================================
// ELIMINAR UNA SUCURSAL
// =====================================
const eliminarSucursal = (req, res) => {
    sucursalModel.eliminarSucursal(req.params.id, (error, resultado) => {
        if (error) {
            console.error(error);

            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    error: 'No se puede eliminar esta sucursal porque tiene registros de inventario o movimientos asociados.'
                });
            }

            return res.status(500).json({
                error: 'Error al eliminar la sucursal'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Sucursal no encontrada'
            });
        }

        res.json({
            mensaje: 'Sucursal eliminada correctamente'
        });
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
