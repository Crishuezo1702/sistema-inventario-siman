const conexion = require('../config/database')

const validarUsuario = (req, res, next) => {

    const {
        nombre,
        correo,
        password,
        id_rol,
        activo
    } = req.body


    // 1. Campos obligatorios
    if(!nombre || !correo || !password || id_rol === undefined || id_rol === null){
        return res.status(400).json({
            error: 'Faltan campos obligatorios'
        })
    }


    // 2. Validar nombre
    if(typeof nombre !== 'string' || nombre.trim() === ''){
        return res.status(400).json({
            error: 'El nombre es obligatorio y debe ser texto'
        })
    }

    if(nombre.length > 100){
        return res.status(400).json({
            error: 'El nombre no puede tener mas de 100 caracteres'
        })
    }


    // 3. Validar correo
    if(typeof correo !== 'string' || correo.trim() === ''){
        return res.status(400).json({
            error: 'El correo es obligatorio y debe ser texto'
        })
    }

    if(correo.length > 100){
        return res.status(400).json({
            error: 'El correo no puede tener mas de 100 caracteres'
        })
    }

   const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!formatoCorreo.test(correo)){
        return res.status(400).json({
            error: 'El correo no tiene un formato valido'
        })
    }


    // 4. Validar password
    if(typeof password !== 'string' || password.trim() === ''){
        return res.status(400).json({
            error: 'La contraseña es obligatoria y debe ser texto'
        })
    }

    if(password.length < 6){
        return res.status(400).json({
            error: 'La contraseña debe tener al menos 6 caracteres'
        })
    }

    if(password.length > 255){
        return res.status(400).json({
            error: 'La contraseña no puede tener mas de 255 caracteres'
        })
    }


    // 5. Validar id_rol
    if(!Number.isInteger(id_rol) || id_rol <= 0){
        return res.status(400).json({
            error: 'El id_rol debe ser un entero positivo'
        })
    }


    // 6. Validar activo
    if(activo !== undefined && typeof activo !== 'boolean'){
        return res.status(400).json({
            error: 'El campo activo debe ser verdadero o falso'
        })
    }


    // 7. Comprobar que el rol exista
    conexion.query(
        'SELECT id_rol FROM roles WHERE id_rol = ?',
        [id_rol],
        (error, resultados) => {

            if(error){
                return res.status(500).json({
                    error: 'Error al comprobar el rol'
                })
            }

            if(resultados.length === 0){
                return res.status(400).json({
                    error: 'El rol no existe'
                })
            }


            // 8. Comprobar que el correo no este registrado
            let sqlCorreo
            let valoresCorreo

            if(req.method === 'PUT'){

                sqlCorreo = `
                    SELECT id_usuario
                    FROM usuarios
                    WHERE correo = ?
                    AND id_usuario != ?
                `

                valoresCorreo = [
                    correo,
                    req.params.id
                ]

            } else {

                sqlCorreo = `
                    SELECT id_usuario
                    FROM usuarios
                    WHERE correo = ?
                `

                valoresCorreo = [
                    correo
                ]
            }


            conexion.query(
                sqlCorreo,
                valoresCorreo,
                (error, resultados) => {

                    if(error){
                        return res.status(500).json({
                            error: 'Error al comprobar el correo'
                        })
                    }

                    if(resultados.length > 0){
                        return res.status(400).json({
                            error: 'El correo ya esta registrado'
                        })
                    }

                    next()
                }
            )
        }
    )
}

module.exports = validarUsuario