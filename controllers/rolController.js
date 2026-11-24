const rolModel = require('../models/rolModel')

const obtenerRoles = (req, res) => {
    rolModel.obtenerRoles((error, resultados) => {
        if(error){
            return res.status(500).json({
                error: 'Error al obtener los roles'
            })
        }

        res.json(resultados)
    })
}

const obtenerRol = (req, res) => {
    rolModel.obtenerRol(req.params.id, (error, resultado) => {
        if(error){
            return res.status(500).json({
                error: 'Error al obtener el rol'
            })
        }

        res.json(resultado)
    })
}

const crearRol = (req, res) => {
    rolModel.crearRol(req.body, (error, resultado) => {
        if(error){
            return res.status(500).json({
                error: 'Error al crear el rol'
            })
        }

        res.status(201).json({
            mensaje: 'Rol creado correctamente',
            id_rol: resultado.insertId
        })
    })
}

const actualizarRol = (req, res) => {
    rolModel.actualizarRol(req.params.id, req.body, (error, resultado) => {
        if(error){
            return res.status(500).json({
                error: 'Error al actualizar el rol'
            })
        }

        res.json({
            mensaje: 'Rol actualizado correctamente'
        })
    })
}

const eliminarRol = (req, res) => {
    rolModel.eliminarRol(req.params.id, (error, resultado) => {
        if(error){
            return res.status(500).json({
                error: 'Error al eliminar el rol'
            })
        }

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                error: 'Rol no encontrado'
            })
        }

        res.json({
            mensaje: 'Rol eliminado correctamente'
        })
    })
}

module.exports = {
    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol,
    eliminarRol
}