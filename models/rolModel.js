const conexion = require('../config/database')

const obtenerRoles = (callback) =>{
    conexion.query(
        'SELECT * FROM roles',
        (error, resultado) =>{
            if(error){
                return callback(error)
            }

            callback(null,resultado)
        }
    )
}

const obtenerRol = (id, callback) =>{
    conexion.query(
        'SELECT * FROM roles WHERE id_rol = ?',
        [id],
        (error, resultado) =>{
            if(error){
                return callback(error)
            }

            callback(null, resultado)
        }
    )
}

const crearRol = (datos, callback) =>{

    const sql = `
        INSERT INTO roles
        (nombre, descripcion)
        VALUES(?,?)
        `
    
   const valores =[
    datos.nombre,
    datos.descripcion
   ]     

   conexion.query(sql, valores, (error, resultado) =>{
        if(error){
            return callback(error)
        }

        callback(null, resultado)
   })
    
}

const actualizarRol = (id, datos, callback) =>{

    const sql = `
        UPDATE roles 
        SET nombre = ?, descripcion = ?
        WHERE id_rol = ?
        `
    
    const valores = [
        datos.nombre,
        datos.descripcion,
        id
    ]

    conexion.query(sql,valores, (error,resultado) =>{
        if(error){
            return callback(error)
        }

        callback(null, resultado)
    })
}

const eliminarRol = (id, callback) =>{
    const sql = `
        DELETE FROM roles
        WHERE id_rol = ?
        `
    
    conexion.query(sql, [id], (error, resultado) =>{
        if(error){
            return callback(error)
        }

        callback(null, resultado)
    })
}

module.exports = {

    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol,
    eliminarRol

}
  