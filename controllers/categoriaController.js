
const categoriaModel = require('../models/categoriaModel')

const obtenerCategorias = (req, res) =>{
    categoriaModel.obtenerCategorias((error, resultados) =>{
        if(error){
            return res.status(500).json({
                error : 'Error al obtener las categorias'
            })
        }

        res.json(resultados)
    })
}

const obtenerCategoria = (req, res) =>{
    categoriaModel.obtenerCategoria(req.params.id, (error, resultado) =>{
        if(error){
            return res.status(500).json({
                error: 'Error al obtener la categoria'
            })
        }

        res.json(resultado)
    })
}

const crearCategoria = (req, res) =>{
    categoriaModel.crearCategoria(req.body, (error, resultado) =>{
        if (error) {
    console.error('Error MySQL al crear categoría:', error);

    return res.status(500).json({
        error: 'Error al crear la categoría',
        detalle: error.message
    });
}

        res.status(201).json({
            mensaje: 'Categoria creada correctamente',
            id_categoria : resultado.insertId
        })
    })
}

const actualizarCategoria = (req, res) =>{
    categoriaModel.actualizarCategoria(req.params.id, req.body, (error, resultado) => {
        if(error){
            return res.status(500).json({
                error: 'Error al actualizar categoria'
            })
        }
        res.json({
            mensaje : 'Categoria actualizada correctamente'
        })
    })
}


const eliminarCategoria = (req, res) => {
    categoriaModel.eliminarCategoria(req.params.id, (error, resultado) => {
        if (error) {
            console.error('Error MySQL al eliminar categoría:', error);

            // Error MySQL: existe una relación con otra tabla
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    error: 'No se puede eliminar esta categoría porque tiene productos asociados.'
                });
            }

            return res.status(500).json({
                error: 'Error al eliminar la categoría'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Categoría no encontrada'
            });
        }

        return res.json({
            mensaje: 'Categoría eliminada correctamente'
        });
    });
};


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}