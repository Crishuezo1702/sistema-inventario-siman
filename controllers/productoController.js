const productoModel = require('../models/productoModel')

const obtenerProductos = (req,res) => {

    productoModel.obtenerProductos((error, resultados) =>{
        if(error){
            return res.status(500).json({
                error: 'Error al obtener los productos'
            })
        }

        res.json(resultados)
    })
}

const obtenerProducto = (req,res) =>{
    productoModel.obtenerProducto(req.params.id, (error,resultado) => {
        if(error){
            return res.status(500).json({
                error : 'Error al obtener el producto'
            })
        }
        res.json(resultado)
    })
}

const crearProducto = (req, res) =>{
    
    productoModel.crearProducto(req.body, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al crear el producto'
            })
        }

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            id_producto: resultado.insertId
        })
    })
}

const actualizarProducto = (req, res) => {

    productoModel.actualizarProducto(req.params.id, req.body, (error, resultado) => {

        if(error){
            return res.status(500).json({
                error: 'Error al actualizar el producto'
            })
        }

        res.json({
            mensaje: 'Producto actualizado correctamente'
        })
    })
}

const eliminarProducto = (req, res) =>{

    productoModel.eliminarProducto(req.params.id, (error, resultado) =>{

        if(error){
            return res.status(500).json({
                error: 'Error al eliminar el producto'
            })
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({
                error : 'Producto no encontrado'
            })
        }

        res.json({
            mensaje: "Producto eliminado correctamente"
        })
    })
}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}