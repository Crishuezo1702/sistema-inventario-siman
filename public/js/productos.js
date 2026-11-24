const tablaProductos = document.querySelector('#tablaProductos')

let idProductoEditando = null

const formatoMoneda = new Intl.NumberFormat('en-US', {
    style : 'currency',
    currency : 'USD'
});

const cargarProductos = async () =>{

    try{

        const respuesta = await fetch('/productos')

        if(!respuesta.ok){
            throw new Error('No se pudieron obtener los productos')
        }

        const productos = await respuesta.json();

        tablaProductos.replaceChildren();

        if(productos.length === 0){
            mostrarMensaje('No hay productos registrados')
            return;
        }

        productos.forEach(producto => {
            const fila = document.createElement('tr')

            const valores = [
                producto.codigo,
                producto.nombre,
                formatoMoneda.format(Number(producto.precio)),
                producto.stock_minimo,
                Number(producto.activo) === 1 ||
                producto.activo === true
                    ? 'Activo'
                    : 'Inactivo'
            ];

            valores.forEach(valor => {

                const celda = document.createElement('td');

                celda.textContent = valor ?? '';

                fila.appendChild(celda)
            });

            
            const celdaAcciones = document.createElement('td');

            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.className = 'btn btn-warning btn-sm me-2';

            btnEditar.addEventListener('click', async () =>{

                try{
                    const respuesta = await fetch(`/productos/${producto.id_producto}`);

                    if(!respuesta.ok){
                        throw new Error('No se pudo obtener el producto');
                    }

                    const resultado = await respuesta.json();

                    if(!respuesta.ok || !resultado || resultado.length ===0){
                        throw new Error('Producto no encontrado')
                    }
                    const productoEditar = resultado[0];

                    idProductoEditando = productoEditar.id_producto

                    tituloModalProducto.textContent = 'Editar producto';
                    btnGuardarProducto.textContent = 'Actualizar producto';
                  

                    document.querySelector('#codigo').value = productoEditar.codigo;
                    document.querySelector('#nombre').value = productoEditar.nombre;
                    document.querySelector('#descripcion').value = productoEditar.descripcion ?? '';
                    document.querySelector('#precio').value = productoEditar.precio;
                    document.querySelector('#stock_minimo').value = productoEditar.stock_minimo;
                    selectCategoria.value = productoEditar.id_categoria;
                    selectProveedor.value = productoEditar.id_proveedor;
                    document.querySelector('#activo').checked =
                        Number(productoEditar.activo) === 1 ||
                        productoEditar.activo === true;

                        ventanaProducto.show()
                        
                }catch (error){
                    console.error('Error al obtener el producto:', error);
                    alert(error.message);
                }
            });

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn btn-danger btn-sm';

            btnEliminar.addEventListener('click', async () =>{
                const confirmar = confirm(
                    `¿Estas seguro de eliminar el producto ${producto.nombre}?`
                );

                if(!confirmar){
                    return;
                }

                try{
                    const respuesta = await fetch(`/productos/${producto.id_producto}`, {
                        method: 'DELETE'
                    });

                    const resultado = await respuesta.json();

                    if(!respuesta.ok){
                        throw new Error(resultado.error || 'No se puedo eliminar el producto');
                    }

                    alert('Producto eliminado correctamente');

                    await cargarProductos();
                }catch (error){
                    console.error('Error al eliminar el producto:', error);
                    alert(error.message)
                }
            });

            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);

            fila.appendChild(celdaAcciones);

            tablaProductos.appendChild(fila)
        })
    } catch (error){

        console.error('Error al cargar los productos', error)

        mostrarMensaje('No se pudieron cargar los productos');
    }
};

const mostrarMensaje = (mensaje) =>{

    tablaProductos.replaceChildren();

    const fila = document.createElement('tr')
    const celda = document.createElement('td')

    celda.colSpan = 6;
    celda.className = 'text-center';
    celda.textContent = mensaje;

    fila.appendChild(celda)
    tablaProductos.appendChild(fila)
}



const btnNuevoProducto = document.querySelector('#btnNuevoProducto');

const ventanaProducto = new bootstrap.Modal(
    document.querySelector('#modalProducto')
);

btnNuevoProducto.addEventListener('click', () => {
    idProductoEditando = null;
    formProducto.reset();

    tituloModalProducto.textContent = 'Nuevo Producto';
    btnGuardarProducto.textContent = 'Guardar Producto'
    ventanaProducto.show();
});

const selectCategoria = document.querySelector('#id_categoria');
const selectProveedor = document.querySelector('#id_proveedor');

const cargarCategorias = async () =>{

    try{
        const respuesta = await fetch('/categorias');

        if(!respuesta.ok){
            throw new Error('No se pudieron obtener las categorias')
        }

        const categorias = await respuesta.json();

        categorias.forEach(categoria => {

            const opcion = document.createElement('option')

            opcion.value = categoria.id_categoria;
            opcion.textContent = categoria.nombre

            selectCategoria.appendChild(opcion)
        });

    } catch(error){
        console.error('Error al cargar las categorias : ', error);
    }
};

const cargarProveedores = async () => {

    try {

        const respuesta = await fetch('/proveedores');

        if(!respuesta.ok){

            throw new Error('No se pudieron obtener los proveedores')
        }

        const proveedores = await respuesta.json();

        proveedores.forEach(proveedor => {

            const opcion = document.createElement('option');

            opcion.value = proveedor.id_proveedor;
            opcion.textContent = proveedor.nombre;

            selectProveedor.appendChild(opcion);
        });
    } catch (error){
        console.error('Error al cargar los proveedores', error)
    }
};

document.addEventListener('DOMContentLoaded', () =>{
    cargarProductos();
    cargarCategorias();
    cargarProveedores();
})

const formProducto = document.querySelector('#formProducto');
const tituloModalProducto = document.querySelector('#tituloModalProducto');
const btnGuardarProducto = document.querySelector('#btnGuardarProducto');

document.querySelector('#modalProducto').addEventListener('hidden.bs.modal', () =>{
    idProductoEditando = null;
    formProducto.reset();

    tituloModalProducto.textContent = 'Nuevo Producto';
    btnGuardarProducto.textContent = 'Guardar Producto';
});

formProducto.addEventListener('submit', async(evento) =>{
    evento.preventDefault();

    const producto = {
        codigo: document.querySelector('#codigo').value.trim(),
        nombre: document.querySelector('#nombre').value.trim(),
        descripcion: document.querySelector('#descripcion').value.trim(),
        precio: Number(document.querySelector('#precio').value),
        stock_minimo : Number(document.querySelector('#stock_minimo').value),
        id_categoria: Number(selectCategoria.value),
        id_proveedor: Number(selectProveedor.value),
        activo: document.querySelector('#activo').checked
    };

    try{
       
        const editando = idProductoEditando !== null;

        const url = editando
            ? `/productos/${idProductoEditando}`
            : '/productos';

        const respuesta = await fetch(url, {
            method: editando ? 'PUT': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })

        const resultado = await respuesta.json();

        if(!respuesta.ok){
            throw new Error(
                resultado.error ||
                (editando
                    ? 'No se pudo actualizar el producto'
                    : 'No se pudo crear el producto')
            );
        
        }

        alert(editando
            ? 'Producto actualizado correctamente'
            : 'Producto creado correctamente'
        );
        idProductoEditando = null

        formProducto.reset();
        ventanaProducto.hide();

        await cargarProductos();
    } catch (error){
        console.error('Error al crear el producto:', error);
        alert(error.message);
    }
});