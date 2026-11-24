const conexion = require('../config/database')

const obtenerProductos = (callback) => {
    conexion.query('SELECT * FROM productos', 
        (error, resultados) => {
            if(error){
                return callback(error);
            }

            callback(null, resultados)
        }
    )
}

const obtenerProducto = (id, callback) =>{
    conexion.query('SELECT * FROM productos WHERE id_producto = ?',
        [id],
        (error, resultado) =>{
                if(error){
                return callback(error)
            }
                callback(null, resultado)
        }
      
    )
}

const crearProducto = (datos, callback) =>{

    const sql = `
        INSERT INTO productos
        (codigo, nombre, descripcion,precio, stock_minimo, id_categoria, id_proveedor, activo)
        VALUES (?,?,?,?,?,?,?,?)
        `

    const valores = [
        datos.codigo,
        datos.nombre,
        datos.descripcion,
        datos.precio,
        datos.stock_minimo,
        datos.id_categoria,
        datos.id_proveedor,
        datos.activo
    ]

    conexion.query(sql, valores, (error, resultado) =>{
        if(error){
            return callback(error)
        }
        callback(null, resultado)
    })
}

const actualizarProducto = (id, datos, callback) => {

    const sql = `
        UPDATE productos
        SET codigo = ?, nombre = ?, descripcion = ?, precio = ?,
            stock_minimo = ?, id_categoria = ?, id_proveedor = ?, activo = ?
        WHERE id_producto = ?
    `

    const valores = [
        datos.codigo,
        datos.nombre,
        datos.descripcion,
        datos.precio,
        datos.stock_minimo,
        datos.id_categoria,
        datos.id_proveedor,
        datos.activo,
        id
    ]

    conexion.query(sql, valores, (error, resultado) => {

        if(error){
            return callback(error)
        }

        callback(null, resultado)
    })
}

const eliminarProducto = (id, callback) =>{

    const sql = `
            delete from productos
            where id_producto = ?
        `
    
        conexion.query(sql, [id], (error, resultado)=>{

            if(error){
                return callback(error)
            }
            callback(null, resultado)
            
        
        })

}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}