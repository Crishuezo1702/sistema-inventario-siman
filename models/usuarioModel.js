const conexion = require('../config/database')

const obtenerUsuarios = (callback) =>{
    conexion.query( 
        'SELECT * FROM usuarios',
        (error, resultado) =>{
            if(error){
                return callback(error)
            }

            callback(null,resultado)
        }
    )
}

const obtenerUsuario = (id, callback) =>{
    conexion.query(
        'SELECT *  FROM usuarios WHERE id_usuario = ?',
        [id],
        (error, resultado) =>{
            if(error){
                return callback(error)
            }

            callback(null,resultado)
        }
    )
}

const crearUsuario = (datos, callback) =>{
    const sql = `
        INSERT INTO usuarios
        (nombre, correo, password, id_rol, activo)
        VALUES (?,?,?,?,?)
        `

    const valores = [
        datos.nombre,
        datos.correo,
        datos.password,
        datos.id_rol,
        datos.activo
    ]

    conexion.query(sql, valores, (error, resultado) =>{
        if(error){
            return callback(error)
        }

        callback(null, resultado)
    })
}

const actualizarUsuario  = (id,datos, callback) =>{
    const sql = 
        `
        UPDATE usuarios
        SET nombre = ?, correo = ?, password = ?, id_rol = ?, activo =?
        WHERE id_usuario = ?
        `

    const valores = [
        datos.nombre,
        datos.correo,
        datos.password,
        datos.id_rol,
        datos.activo,
        id
    ]

    conexion.query(sql, valores, (error, resultado) =>{
        if(error){
            return callback(error)
        }
        callback(null, resultado)
    })
}

const eliminarUsuario = (id, callback) =>{
    const sql = `
        DELETE FROM usuarios 
        WHERE id_usuario = ?
        `

    conexion.query(sql, [id], (error, resultado) =>{
        if(error){
            return callback(error)
        }

        callback(null, resultado)
    })
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}