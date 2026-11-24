const reportesModel = require('../models/reportesModel')

const obtenerProductosConCategoriaProveedor = (req, res) =>{

    reportesModel.obtenerProductosConCategoriaProveedor(
        (error, resultados) =>{

            if(error){
                return res.status(500).json({
                    error : 'Error al obtener productos con categoria y proveedor'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerInventarioPorSucursal = (req, res) =>{

    reportesModel.obtenerInventarioPorSucursal(
        (error, resultados) => {

            if(error){
                return res.status(500).json({
                    error : 'Error al obtener inventario por sucursal'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerProductosParaReposicion = (req, res) =>{

    reportesModel.obtenerProductosParaReposicion(
        (error, resultados) =>{

            if(error){
                return res.status(500).json({
                    error : 'Error al obtener productos para reposicion'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerMovimientosConDetalles = (req, res) =>{

    reportesModel.obtenerMovimientosConDetalles(

        (error, resultados) =>{

            if(error){
                return res.status(500).json({
                    error : 'Error al obtener movimientos con detalles'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerEntradasSalidasPorProducto = (req, res) =>{

    reportesModel.obtenerEntradasSalidasPorProducto(
        (error, resultados) =>{

            if(error){
                return res.status(500).json({
                    error : 'Error al obtener entradas y salidas por producto'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerResumenEntradasSalidasPorSucursal = (req, res) =>{

    reportesModel.obtenerResumenEntradasSalidasPorSucursal(
        (error, resultados) =>{
            if(error){
                return res.status(500).json({
                    error : 'Error al obtener resumen de entradas y salidas por sucursal'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerStockTotalPorProducto = (req, res) =>{

    reportesModel.obtenerStockTotalPorProducto(
        (error, resultados) =>{

            if(error){
                return res.status(500).json({
                    error : 'Error al obtener el stock total por producto'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerValorInventarioPorSucursal = (req, res) =>{

    reportesModel.obtenerValorInventarioPorSucursal(
        (error, resultados) =>{

            if(error){
                return res.status(500).json({
                    error: 'Error al obtener el valor del inventario por sucursal'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerTopCincoProductosPorValor = (req, res) =>{

    reportesModel.obtenerTopCincoProductosPorValor(
        (error,resultados) =>{

            if(error){
                return res.status(500).json({
                    error :'Error al obtener los cinco productos con mayor valor'
                })
            }

            res.json(resultados)
        }
    )
}

const obtenerInventarioPorCategoria = (req, res) =>{

    reportesModel.obtenerInventarioPorCategoria(
        (error, resultados) =>{

            if(error){
                return res.status(500).json({
                    error : 'Error al obtener el inventario por categoria'
                })
            }

            res.json(resultados)
        }
    )
}

module.exports ={
    obtenerProductosConCategoriaProveedor,
    obtenerInventarioPorSucursal,
    obtenerProductosParaReposicion,
    obtenerMovimientosConDetalles,
    obtenerEntradasSalidasPorProducto,
    obtenerResumenEntradasSalidasPorSucursal,
    obtenerStockTotalPorProducto,
    obtenerValorInventarioPorSucursal,
    obtenerTopCincoProductosPorValor,
    obtenerInventarioPorCategoria
}