const conexion = require('../config/database')

const obtenerCategorias = (callback) =>{
    conexion.query('SELECT * FROM categorias',
        (error,resultados) =>{
            if(error){
                return callback(error)
            }

            callback(null, resultados)
        }
    )
}

const obtenerCategoria = (id, callback) =>{
    conexion.query('SELECT * FROM categorias where id_categoria = ?',
        [id],
        (error, resultado) =>{
            if(error){
                return callback(error)
            }
            
            callback(null, resultado)
        }
    )
}


const crearCategoria = (datos, callback) => {
    const sql = `
        INSERT INTO categorias
        (nombre, descripcion, activo)
        VALUES (?, ?, ?)
    `;

    const valores = [
        datos.nombre,
        datos.descripcion,
        datos.activo ?? true
    ];

    conexion.query(sql, valores, (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};



const actualizarCategoria = (id, datos, callback) => {
    const sql = `
        UPDATE categorias
        SET nombre = ?, descripcion = ?, activo = ?
        WHERE id_categoria = ?
    `;

    const valores = [
        datos.nombre,
        datos.descripcion,
        datos.activo ?? true,
        id
    ];

    conexion.query(sql, valores, (error, resultado) => {
        if (error) {
            return callback(error);
        }

        callback(null, resultado);
    });
};


const eliminarCategoria = (id, callback) =>{

    const sql = `
        DELETE FROM categorias
        WHERE id_categoria = ?
    `

    conexion.query(sql, [id], (error, resultado) => {
        if(error){
            return callback(error)
        }

        callback(null, resultado)
    })
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}