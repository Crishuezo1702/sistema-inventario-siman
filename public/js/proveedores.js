
const tablaProveedores = document.querySelector('#tablaProveedores');
const modalProveedor = new bootstrap.Modal(
    document.querySelector('#modalProveedor')
);
const formProveedor = document.querySelector('#formProveedor');
const btnNuevoProveedor = document.querySelector('#btnNuevoProveedor');
const tituloModalProveedor = document.querySelector('#tituloModalProveedor');
const btnGuardarProveedor = document.querySelector('#btnGuardarProveedor');

let idProveedorEditar = null;

// =====================================
// CARGAR PROVEEDORES
// =====================================
const cargarProveedores = async () => {
    try {
        const respuesta = await fetch('/proveedores');

        if (!respuesta.ok) {
            throw new Error('Error al obtener los proveedores');
        }

        const proveedores = await respuesta.json();

        tablaProveedores.innerHTML = '';

        if (proveedores.length === 0) {
            tablaProveedores.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">
                        No hay proveedores registrados.
                    </td>
                </tr>
            `;
            return;
        }

        proveedores.forEach(proveedor => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${proveedor.id_proveedor}</td>
                <td>${proveedor.nombre}</td>
                <td>${proveedor.contacto || '—'}</td>
                <td>${proveedor.telefono || '—'}</td>
                <td>${proveedor.correo || '—'}</td>
                <td>
                    <span class="badge ${
                        proveedor.activo ? 'bg-success' : 'bg-secondary'
                    }">
                        ${proveedor.activo ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td>
                    <button
                        type="button"
                        class="btn btn-sm btn-primary btn-editar me-1"
                        data-id="${proveedor.id_proveedor}">
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn btn-sm btn-danger btn-eliminar"
                        data-id="${proveedor.id_proveedor}">
                        Eliminar
                    </button>
                </td>
            `;

            tablaProveedores.appendChild(fila);
        });

    } catch (error) {
        console.error('Error al cargar proveedores:', error);

        tablaProveedores.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    No se pudieron cargar los proveedores.
                </td>
            </tr>
        `;
    }
};

// =====================================
// LIMPIAR FORMULARIO
// =====================================
const limpiarFormulario = () => {
    formProveedor.reset();
    idProveedorEditar = null;
    btnGuardarProveedor.disabled = false;
    btnGuardarProveedor.textContent = 'Guardar proveedor';
};

// =====================================
// ABRIR MODAL PARA NUEVO PROVEEDOR
// =====================================
btnNuevoProveedor.addEventListener('click', () => {
    limpiarFormulario();

    tituloModalProveedor.textContent = 'Nuevo proveedor';
    btnGuardarProveedor.textContent = 'Guardar proveedor';

    modalProveedor.show();
});

// =====================================
// CREAR O ACTUALIZAR PROVEEDOR
// =====================================
formProveedor.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const datosProveedor = {
        nombre: document.querySelector('#nombreProveedor').value.trim(),
        contacto: document.querySelector('#contactoProveedor').value.trim(),
        telefono: document.querySelector('#telefonoProveedor').value.trim(),
        correo: document.querySelector('#correoProveedor').value.trim(),
        direccion: document.querySelector('#direccionProveedor').value.trim(),
        activo: document.querySelector('#activoProveedor').checked
    };

    if (!datosProveedor.nombre) {
        alert('El nombre del proveedor es obligatorio.');
        return;
    }

    const estaEditando = idProveedorEditar !== null;

    const url = estaEditando
        ? `/proveedores/${idProveedorEditar}`
        : '/proveedores';

    const metodo = estaEditando ? 'PUT' : 'POST';

    try {
        btnGuardarProveedor.disabled = true;
        btnGuardarProveedor.textContent = 'Guardando...';

        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosProveedor)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            alert(resultado.error || 'No se pudo guardar el proveedor.');
            return;
        }

        alert(
            estaEditando
                ? 'Proveedor actualizado correctamente.'
                : 'Proveedor guardado correctamente.'
        );

        modalProveedor.hide();
        limpiarFormulario();

        await cargarProveedores();

    } catch (error) {
        console.error('Error al guardar proveedor:', error);
        alert('No se pudo conectar con el servidor.');
    } finally {
        btnGuardarProveedor.disabled = false;
        btnGuardarProveedor.textContent = estaEditando
            ? 'Actualizar proveedor'
            : 'Guardar proveedor';
    }
});

// =====================================
// EDITAR PROVEEDOR
// =====================================
tablaProveedores.addEventListener('click', async (evento) => {
    const botonEditar = evento.target.closest('.btn-editar');

    if (!botonEditar) {
        return;
    }

    const id = botonEditar.dataset.id;

    try {
        const respuesta = await fetch(`/proveedores/${id}`);

        const proveedor = await respuesta.json();

        if (!respuesta.ok) {
            alert(proveedor.error || 'No se pudo obtener el proveedor.');
            return;
        }

        // Algunas rutas devuelven un arreglo con el registro.
        const datos = Array.isArray(proveedor)
            ? proveedor[0]
            : proveedor;

        if (!datos || !datos.id_proveedor) {
            alert('No se encontró el proveedor solicitado.');
            return;
        }

        idProveedorEditar = datos.id_proveedor;

        document.querySelector('#nombreProveedor').value =
            datos.nombre || '';

        document.querySelector('#contactoProveedor').value =
            datos.contacto || '';

        document.querySelector('#telefonoProveedor').value =
            datos.telefono || '';

        document.querySelector('#correoProveedor').value =
            datos.correo || '';

        document.querySelector('#direccionProveedor').value =
            datos.direccion || '';

        document.querySelector('#activoProveedor').checked =
            Boolean(datos.activo);

        tituloModalProveedor.textContent = 'Editar proveedor';
        btnGuardarProveedor.textContent = 'Actualizar proveedor';

        modalProveedor.show();

    } catch (error) {
        console.error('Error al obtener proveedor:', error);
        alert('No se pudo conectar con el servidor.');
    }
});

// =====================================
// ELIMINAR PROVEEDOR
// =====================================
tablaProveedores.addEventListener('click', async (evento) => {
    const botonEliminar = evento.target.closest('.btn-eliminar');

    if (!botonEliminar) {
        return;
    }

    const id = botonEliminar.dataset.id;

    const confirmar = confirm(
        '¿Estás seguro de que deseas eliminar este proveedor?'
    );

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(`/proveedores/${id}`, {
            method: 'DELETE'
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            alert(resultado.error || 'No se pudo eliminar el proveedor.');
            return;
        }

        alert(resultado.mensaje || 'Proveedor eliminado correctamente.');

        await cargarProveedores();

    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        alert('No se pudo conectar con el servidor.');
    }
});

// =====================================
// INICIAR MÓDULO
// =====================================
cargarProveedores();
