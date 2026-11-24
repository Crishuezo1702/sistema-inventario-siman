const proveedorModel = require('../models/proveedorModel')

const obtenerProveedores = (req, res) =>{
    proveedorModel.obtenerProveedores((error,resultados) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al obtener los proveedores'
            })
        }
        res.json(resultados)
    })
}

const obtenerProveedor = (req, res) => {
    proveedorModel.obtenerProveedor(req.params.id, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al obtener el proveedor'
            })
        }
        res.json(resultado)
    })
}

const crearProveedor = (req, res) =>{
    proveedorModel.crearProveedor(req.body, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error: 'Error al crear el proveedor'
            })
        }

        res.status(201).json({
            mensaje : 'Proveedor creado correctamente',
            id_proveedor : resultado.insertId
        })
    })
}

const actualizarProveedor = (req, res) =>{
    proveedorModel.actualizarProveedor(req.params.id, req.body, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al actualizar el proveedor'
            })
        }

        res.json({
            mensaje : 'Proveedor actualizado correctamente'
        })
    })
}

const eliminarProveedor = (req, res) => {

    proveedorModel.eliminarProveedor(req.params.id, (error, resultado) => {

        if (error) {
            console.error('Error MySQL al eliminar proveedor:', error);

            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    error: 'No se puede eliminar este proveedor porque tiene productos asociados.'
                });
            }

            return res.status(500).json({
                error: 'Error al eliminar el proveedor'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Proveedor no encontrado'
            });
        }

        return res.json({
            mensaje: 'Proveedor eliminado correctamente'
        });
    });
};

module.exports = {
    obtenerProveedores,
    obtenerProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
}