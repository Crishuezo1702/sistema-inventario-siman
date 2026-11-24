const conexion = require('../config/database')

const validarProducto = (req, res, next) => {

    const {
        codigo,
        nombre,
        descripcion,
        precio,
        stock_minimo,
        id_categoria,
        id_proveedor,
        activo
    } = req.body


    // 1. Campos obligatorios
    if(!codigo || !nombre || precio === undefined || !id_categoria || !id_proveedor){
        return res.status(400).json({
            error: 'Faltan campos obligatorios'
        })
    }


    // 2. Validar codigo
    if(typeof codigo !== 'string' || codigo.trim() === ''){
        return res.status(400).json({
            error: 'El codigo es obligatorio y debe ser texto'
        })
    }

    if(codigo.length > 50){
        return res.status(400).json({
            error: 'El codigo no puede tener mas de 50 caracteres'
        })
    }


    // 3. Validar nombre
    if(typeof nombre !== 'string' || nombre.trim() === ''){
        return res.status(400).json({
            error: 'El nombre es obligatorio y debe ser texto'
        })
    }

    if(nombre.length > 150){
        return res.status(400).json({
            error: 'El nombre no puede tener mas de 150 caracteres'
        })
    }


    // 4. Validar descripcion
    if(descripcion !== undefined && descripcion !== null){

        if(typeof descripcion !== 'string'){
            return res.status(400).json({
                error: 'La descripcion debe ser texto'
            })
        }

        if(descripcion.length > 255){
            return res.status(400).json({
                error: 'La descripcion no puede tener mas de 255 caracteres'
            })
        }
    }


    // 5. Validar precio
    if(typeof precio !== 'number' || Number.isNaN(precio)){
        return res.status(400).json({
            error: 'El precio debe ser un numero'
        })
    }

    if(precio <= 0){
        return res.status(400).json({
            error: 'El precio debe ser mayor que 0'
        })
    }


    // 6. Validar stock minimo
    if(stock_minimo !== undefined){

        if(typeof stock_minimo !== 'number' || !Number.isInteger(stock_minimo)){
            return res.status(400).json({
                error: 'El stock minimo debe ser un numero entero'
            })
        }

        if(stock_minimo < 0){
            return res.status(400).json({
                error: 'El stock minimo no puede ser negativo'
            })
        }
    }


    // 7. Validar categoria
    if(!Number.isInteger(id_categoria) || id_categoria <= 0){
        return res.status(400).json({
            error: 'El id_categoria debe ser un numero positivo'
        })
    }


    // 8. Validar proveedor
    if(!Number.isInteger(id_proveedor) || id_proveedor <= 0){
        return res.status(400).json({
            error: 'El id_proveedor debe ser un entero positivo'
        })
    }


    // 9. Validar activo
    if(activo !== undefined && typeof activo !== 'boolean'){
        return res.status(400).json({
            error: 'El campo activo debe ser verdadero o falso'
        })
    }


    // 10. Comprobar que la categoria exista
    conexion.query(
        'SELECT id_categoria FROM categorias WHERE id_categoria = ?',
        [id_categoria],
        (error, resultados) => {

            if(error){
                return res.status(500).json({
                    error: 'Error al comprobar la categoria'
                })
            }

            if(resultados.length === 0){
                return res.status(400).json({
                    error: 'La categoria no existe'
                })
            }


            // 11. Comprobar que el proveedor exista
            conexion.query(
                'SELECT id_proveedor FROM proveedores WHERE id_proveedor = ?',
                [id_proveedor],
                (error, resultados) => {

                    if(error){
                        return res.status(500).json({
                            error: 'Error al comprobar el proveedor'
                        })
                    }

                    if(resultados.length === 0){
                        return res.status(400).json({
                            error: 'El proveedor no existe'
                        })
                    }


                    // Si todo esta correcto, continuar al controller
                    next()
                }
            )
        }
    )
}

module.exports = validarProducto