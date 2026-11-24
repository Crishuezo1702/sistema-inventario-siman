const validarRol = (req, res, next) =>{

    const {
        nombre,
        descripcion
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

    if(nombre.length > 50){
        return res.status(400).json({
            error : 'El nombre no puede tener mas de 50 caracteres'
        })
    }

    if(descripcion !== undefined && descripcion !== null){
        if(typeof descripcion !== 'string'){
            return res.status(400).json({
                error: 'La descripcion debe ser texto'
            })
        }

        if(descripcion.length > 150){
            return res.status(400).json({
                error : 'La descripcion no puede tener mas de 150 caracteres'
            })
        }
    }

    if(req.method === 'PUT'){

        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <=0){
            return res.status(400).json({
                error : 'El id del rol debe ser un entero positivo'
            })
        }
    }

    next()
}

module.exports = validarRol