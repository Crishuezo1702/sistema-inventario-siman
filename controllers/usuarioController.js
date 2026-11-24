const usuarioModel = require('../models/usuarioModel')

const obtenerUsuarios = (req,res) =>{
    usuarioModel.obtenerUsuarios((error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al obtener los usuarios'
            })
        }
        res.json(resultado)
    })
}

const obtenerUsuario = (req,res) =>{
    usuarioModel.obtenerUsuario(req.params.id, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al obtener el usuario'
            })
        }
        res.json(resultado)
    })
}

const crearUsuario = (req, res) =>{
    usuarioModel.crearUsuario(req.body, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al crear al usuario'
            })
        }
        res.status(201).json({
            mensaje : 'Usuario creado correctamente',
            id_usuario: resultado.insertId
        })
    })
}

const actualizarUsuario = (req, res) =>{
    usuarioModel.actualizarUsuario(req.params.id, req.body, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al actualizar el usuario'
            })
        }

        res.json({
            mensaje: 'Usuario actualizado correctamente'
        })
    })
}

const eliminarUsuario = (req, res) =>{
    usuarioModel.eliminarUsuario(req.params.id, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al eliminar el usuario'
            })
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({
                error: 'Usuario no encontrado'
            })
        }
        res.json({
            mensaje : 'Usuario eliminado correctamente'
        })
    })
}

module.exports ={
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}