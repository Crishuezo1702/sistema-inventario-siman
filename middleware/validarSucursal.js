const validarSucursal = (req, res, next) => {

    const {
        nombre,
        direccion,
        telefono,
        activo
    } = req.body

    // 1. Validar nombre
    if(nombre === undefined || nombre === null){
        return res.status(400).json({
            error: 'El nombre es obligatorio'
        })
    }

    if(typeof nombre !== 'string'){
        return res.status(400).json({
            error: 'El nombre debe ser texto'
        })
    }

    if(nombre.trim() === ''){
        return res.status(400).json({
            error: 'El nombre no puede estar vacio'
        })
    }

    if(nombre.length > 100){
        return res.status(400).json({
            error: 'El nombre no puede tener mas de 100 caracteres'
        })
    }


    // 2. Validar direccion
    if(direccion === undefined || direccion === null){
        return res.status(400).json({
            error: 'La direccion es obligatoria'
        })
    }

    if(typeof direccion !== 'string'){
        return res.status(400).json({
            error: 'La direccion debe ser texto'
        })
    }

    if(direccion.trim() === ''){
        return res.status(400).json({
            error: 'La direccion no puede estar vacia'
        })
    }

    if(direccion.length > 200){
        return res.status(400).json({
            error: 'La direccion no puede tener mas de 200 caracteres'
        })
    }


    // 3. Validar telefono
    if(telefono !== undefined && telefono !== null){

        if(typeof telefono !== 'string'){
            return res.status(400).json({
                error: 'El telefono debe ser texto'
            })
        }

        if(telefono.trim() === ''){
            return res.status(400).json({
                error: 'El telefono no puede estar vacio'
            })
        }

        if(telefono.length > 20){
            return res.status(400).json({
                error: 'El telefono no puede tener mas de 20 caracteres'
            })
        }

        const formatoTelefono = /^[0-9+\-\s()]+$/

        if(!formatoTelefono.test(telefono)){
            return res.status(400).json({
                error: 'El telefono tiene un formato no valido'
            })
        }
    }


    // 4. Validar activo
    if(activo !== undefined && typeof activo !== 'boolean'){
        return res.status(400).json({
            error: 'El campo activo debe ser verdadero o falso'
        })
    }


    // 5. Validar ID cuando sea PUT
    if(req.method === 'PUT'){

        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                error: 'El id de la sucursal debe ser un entero positivo'
            })
        }
    }

    next()
}

module.exports = validarSucursal