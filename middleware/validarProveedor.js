const conexion = require('../config/database')

const validarProveedor = (req, res, next) =>{

    const {
        nombre,
        contacto,
        telefono,
        correo,
        direccion,
        activo
    }= req.body

    if(!nombre){
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

    if(contacto !== undefined && contacto !== null){

        if(typeof contacto !== 'string'){
            return res.status(400).json({
                error : 'El contacto debe ser texto'
            })
        }

        if(contacto.trim() === ''){
            return res.status(400).json({
                error: 'El contacto no puede estar vacio'
            })
        }
    }

    if(telefono !== undefined && telefono !==null){
        
        if(typeof telefono !== 'string'){
            return res.status(400).json({
                error:' El telefono debe ser texto'
            })
        }

        if(telefono.trim() === ''){
            return res.status(400).json({
                error : 'El telefono no puede estar vacio'
            })
        }

        const formatoTelefono = /^[0-9+\-\s()]+$/

        if(!formatoTelefono.test(telefono)){
            return res.status(400).json({
                error: 'El telefono tiene un formato no valido'
            })
        }
    }

    if(correo !== undefined && correo !== null){
        
        if(typeof correo !== 'string'){
            return res.status(400).json({
                error: 'El correo debe ser texto'
            })
        }

        if(correo.trim() === ''){
            return res.status(400).json({
                error :'El correo no puede estar vacio'
            })
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!formatoCorreo.test(correo)){
            return res.status(400).json({
                error : 'El correo no tiene un formato valido'
            })
        }
    }

    if(direccion !== undefined && direccion !== null){

        if(typeof direccion !== 'string'){
            return res.status(400).json({
                error : 'La direccion debe ser texto'
            })
        }

        if(direccion.trim() === ''){
            return res.status(400).json({
                error : 'La direccion no puede estar vacia'
            })
        }
    }

    if(activo !== undefined && typeof activo !== 'boolean'){
        return res.status(400).json({
            error : 'El campo activo debe ser verdadero o falso'
        })
    }

    if(req.method === 'PUT'){

        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                error:'El id del proveedor debe ser un entero positivo'
            })
        }
    }

    next()
}

module.exports = validarProveedor