
const tablaInventario = document.querySelector('#tablaInventario');

const modalInventario = new bootstrap.Modal(
    document.querySelector('#modalInventario')
);

const formInventario = document.querySelector('#formInventario');
const btnNuevoInventario = document.querySelector('#btnNuevoInventario');
const btnGuardarInventario = document.querySelector('#btnGuardarInventario');

const productoInventario = document.querySelector('#productoInventario');
const sucursalInventario = document.querySelector('#sucursalInventario');
const cantidadInventario = document.querySelector('#cantidadInventario');

const tituloModalInventario = document.querySelector('#tituloModalInventario');

let idInventarioEditar = null;


// ==========================================
// CARGAR INVENTARIO
// ==========================================

const cargarInventario = async () => {

    try {

        const respuesta = await fetch('/inventario');

        if (!respuesta.ok) {
            throw new Error('Error al obtener el inventario');
        }

        const inventarios = await respuesta.json();

        tablaInventario.innerHTML = '';

        if (inventarios.length === 0) {

            tablaInventario.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">
                        No hay registros de inventario.
                    </td>
                </tr>
            `;

            return;
        }

        inventarios.forEach(inventario => {

            const fila = document.createElement('tr');

            const estadoStock = inventario.estado_stock === 'Stock bajo'
                ? '<span class="badge bg-danger">Stock bajo</span>'
                : '<span class="badge bg-success">Disponible</span>';

            fila.innerHTML = `
                <td>${inventario.id_inventario}</td>
                <td>${inventario.nombre_producto}</td>
                <td>${inventario.codigo_producto}</td>
                <td>${inventario.nombre_sucursal}</td>
                <td>${inventario.cantidad}</td>
                <td>${inventario.stock_minimo}</td>
                <td>${estadoStock}</td>

                <td>
                    <button
                        class="btn btn-sm btn-warning me-1 btnEditarInventario"
                        data-id="${inventario.id_inventario}">
                        Editar
                    </button>

                    <button
                        class="btn btn-sm btn-danger btnEliminarInventario"
                        data-id="${inventario.id_inventario}">
                        Eliminar
                    </button>
                </td>
            `;

            tablaInventario.appendChild(fila);

        });

    } catch (error) {

        console.error(error);

        tablaInventario.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-danger">
                    Error al cargar el inventario.
                </td>
            </tr>
        `;

    }

};


// ==========================================
// CARGAR PRODUCTOS EN EL SELECT
// ==========================================

const cargarProductosSelect = async () => {

    const respuesta = await fetch('/productos');

    if (!respuesta.ok) {
        throw new Error('Error al cargar los productos');
    }

    const productos = await respuesta.json();

    productoInventario.innerHTML = `
        <option value="">Seleccione un producto</option>
    `;

    productos
        .filter(producto => producto.activo)
        .forEach(producto => {

            const opcion = document.createElement('option');

            opcion.value = producto.id_producto;
            opcion.textContent = producto.nombre;

            productoInventario.appendChild(opcion);

        });

};


// ==========================================
// CARGAR SUCURSALES EN EL SELECT
// ==========================================

const cargarSucursalesSelect = async () => {

    const respuesta = await fetch('/sucursales');

    if (!respuesta.ok) {
        throw new Error('Error al cargar las sucursales');
    }

    const sucursales = await respuesta.json();

    sucursalInventario.innerHTML = `
        <option value="">Seleccione una sucursal</option>
    `;

    sucursales
        .filter(sucursal => sucursal.activo)
        .forEach(sucursal => {

            const opcion = document.createElement('option');

            opcion.value = sucursal.id_sucursal;
            opcion.textContent = sucursal.nombre;

            sucursalInventario.appendChild(opcion);

        });

};


// ==========================================
// ABRIR MODAL PARA NUEVO INVENTARIO
// ==========================================

btnNuevoInventario.addEventListener('click', async () => {

    try {

        formInventario.reset();

        idInventarioEditar = null;

        tituloModalInventario.textContent = 'Nuevo inventario';

        btnGuardarInventario.textContent = 'Guardar inventario';

        await cargarProductosSelect();

        await cargarSucursalesSelect();

        modalInventario.show();

    } catch (error) {

        console.error(error);

        alert('No se pudieron cargar los datos del formulario.');

    }

});


// ==========================================
// CREAR Y ACTUALIZAR INVENTARIO
// ==========================================

formInventario.addEventListener('submit', async (evento) => {

    evento.preventDefault();

    const datosInventario = {

        id_producto: Number(productoInventario.value),

        id_sucursal: Number(sucursalInventario.value),

        cantidad: Number(cantidadInventario.value)

    };

    // VALIDAR DATOS

    if (
        !Number.isInteger(datosInventario.id_producto) ||
        datosInventario.id_producto <= 0 ||
        !Number.isInteger(datosInventario.id_sucursal) ||
        datosInventario.id_sucursal <= 0 ||
        cantidadInventario.value.trim() === '' ||
        !Number.isInteger(datosInventario.cantidad) ||
        datosInventario.cantidad < 0
    ) {

        alert('Verifica los datos del inventario.');

        return;

    }

    const editando = idInventarioEditar !== null;

    try {

        btnGuardarInventario.disabled = true;

        btnGuardarInventario.textContent = editando
            ? 'Actualizando...'
            : 'Guardando...';

        const url = editando
            ? `/inventario/${idInventarioEditar}`
            : '/inventario';

        const respuesta = await fetch(url, {

            method: editando ? 'PUT' : 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(datosInventario)

        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {

            alert(resultado.error || 'No se pudo guardar el inventario.');

            return;

        }

        alert(
            editando
                ? 'Inventario actualizado correctamente.'
                : 'Inventario registrado correctamente.'
        );

        modalInventario.hide();

        formInventario.reset();

        idInventarioEditar = null;

        await cargarInventario();

    } catch (error) {

        console.error(error);

        alert('Error de conexión con el servidor.');

    } finally {

        btnGuardarInventario.disabled = false;

        btnGuardarInventario.textContent = 'Guardar inventario';

    }

});


// ==========================================
// EDITAR INVENTARIO
// ==========================================

tablaInventario.addEventListener('click', async (evento) => {

    const botonEditar = evento.target.closest('.btnEditarInventario');

    if (!botonEditar) return;

    const id = botonEditar.dataset.id;

    try {

        const respuesta = await fetch(`/inventario/${id}`);

        const inventario = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                inventario.error || 'No se pudo obtener el inventario.'
            );

        }

        await cargarProductosSelect();

        await cargarSucursalesSelect();

        idInventarioEditar = id;

        productoInventario.value = inventario.id_producto;

        sucursalInventario.value = inventario.id_sucursal;

        cantidadInventario.value = inventario.cantidad;

        tituloModalInventario.textContent = 'Editar inventario';

        btnGuardarInventario.textContent = 'Actualizar inventario';

        modalInventario.show();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});


// ==========================================
// ELIMINAR INVENTARIO
// ==========================================

tablaInventario.addEventListener('click', async (evento) => {

    const botonEliminar = evento.target.closest('.btnEliminarInventario');

    if (!botonEliminar) return;

    const id = botonEliminar.dataset.id;

    const confirmar = confirm(
        '¿Estás seguro de que deseas eliminar este registro de inventario?'
    );

    if (!confirmar) return;

    try {

        botonEliminar.disabled = true;

        const respuesta = await fetch(`/inventario/${id}`, {
            method: 'DELETE'
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                resultado.error || 'No se pudo eliminar el inventario.'
            );

        }

        alert('Inventario eliminado correctamente.');

        await cargarInventario();

    } catch (error) {

        console.error(error);

        alert(error.message);

        botonEliminar.disabled = false;

    }

});


// ==========================================
// INICIAR MÓDULO
// ==========================================

cargarInventario();
