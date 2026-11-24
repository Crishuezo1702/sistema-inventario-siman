const validarCategoria = (req, res, next) =>{

    const {
        nombre,
        descripcion,
        activo
    } = req.body

    if(nombre === undefined || nombre === null){
        return res.status(400).json({
            error : 'El nombre es obligatorio'
        })
    }

    if(typeof nombre !== 'string'){
        return res.status(400).json({
            error : 'El nombre debe ser texto'
        })
    }

    if(nombre.trim() === ''){
        return res.status(400).json({
            error : 'El nombre no puede estar vacio'
        })
    }

    if(nombre.length > 100){
        return res.status(400).json({
            error : 'El nombre no puede tener mas de 100 caracteres'
        })
    }

    if(descripcion !== undefined && descripcion !== null){

        if(typeof descripcion !== 'string'){
            return res.status(400).json({
                error : 'La descripcion debe ser texto'
            })
        }

        if(descripcion.length > 200){
            return res.status(400).json({
                error : 'La descripcion no puede tener mas de 200 caracteres'
            })
        }
    }

    if (activo !== undefined && typeof activo !== 'boolean') {
         return res.status(400).json({
        error: 'El estado activo debe ser verdadero o falso'
         });
    }

     if(req.method === 'PUT'){

        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                error : 'El id de la categoria debe ser un entero positivo'
            })
        }
    }

    next()
}

module.exports = validarCategoria

