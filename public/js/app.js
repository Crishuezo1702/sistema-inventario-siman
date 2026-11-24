const formatoNumero = new Intl.NumberFormat('es-SV')

const formatoMoneda = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency : 'USD'
})

const cargarDashboard = async () => {

    try {
        const respuestas = await Promise.all([
            fetch('/productos'),
            fetch('/inventario'),
            fetch('/reportes/productos-para-reposicion'),
            fetch('/reportes/valor-inventario-por-sucursal')
        ])

        if(respuestas.some(respuesta => !respuesta.ok)){
            throw new Error('No se pudieron obtener los datos del dashboard')
        }

        const [
            productos,
            inventarios,
            productosReposicion,
            valoresSucursal
        ] = await Promise.all(
            respuestas.map(respuesta => respuesta.json())
        )

        document.querySelector('#totalProductos').textContent =
            formatoNumero.format(productos.length)

        const totalUnidades = inventarios.reduce(
                (total, item) => total + Number(item.cantidad),
                0
        )

        document.querySelector('#totalUnidades').textContent =
            formatoNumero.format(totalUnidades)
        
        document.querySelector('#productosReposicion').textContent =
            formatoNumero.format(productosReposicion.length)
        
        const valorTotal = valoresSucursal.reduce(
            (total, sucursal) => total + Number(sucursal.valor_inventario),
            0
        )

        document.querySelector('#valorInventario').textContent =
            formatoMoneda.format(valorTotal)
    } catch (error){

        console.error('Error al cargar el dashboard:', error)

        document.querySelector('#totalProductos').textContent = 'Error'
        document.querySelector('#totalUnidades').textContent = 'Error'
        document.querySelector('#productosReposicion').textContent = 'Error'
        document.querySelector('#valorInventario').textContent = 'Error'
    }
}

document.addEventListener('DOMContentLoaded', cargarDashboard)