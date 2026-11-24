
const tablaSucursales = document.querySelector('#tablaSucursales');
const modalSucursal = new bootstrap.Modal(
    document.querySelector('#modalSucursal')
);

const formSucursal = document.querySelector('#formSucursal');
const btnNuevaSucursal = document.querySelector('#btnNuevaSucursal');
const tituloModalSucursal = document.querySelector('#tituloModalSucursal');
const btnGuardarSucursal = document.querySelector('#btnGuardarSucursal');

let idSucursalEditar = null;

// =====================================
// CARGAR SUCURSALES
// =====================================
const cargarSucursales = async () => {
    try {
        const respuesta = await fetch('/sucursales');

        if (!respuesta.ok) {
            throw new Error('Error al obtener las sucursales');
        }

        const sucursales = await respuesta.json();

        tablaSucursales.innerHTML = '';

        if (sucursales.length === 0) {
            tablaSucursales.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No hay sucursales registradas.
                    </td>
                </tr>
            `;
            return;
        }

        sucursales.forEach(sucursal => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${sucursal.id_sucursal}</td>
                <td>${sucursal.nombre}</td>
                <td>${sucursal.direccion}</td>
                <td>${sucursal.telefono || '—'}</td>
                <td>
                    <span class="badge ${
                        sucursal.activo ? 'bg-success' : 'bg-secondary'
                    }">
                        ${sucursal.activo ? 'Activa' : 'Inactiva'}
                    </span>
                </td>
                <td>
                    <button
                        type="button"
                        class="btn btn-sm btn-primary btn-editar me-1"
                        data-id="${sucursal.id_sucursal}">
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn btn-sm btn-danger btn-eliminar"
                        data-id="${sucursal.id_sucursal}">
                        Eliminar
                    </button>
                </td>
            `;

            tablaSucursales.appendChild(fila);
        });

    } catch (error) {
        console.error('Error al cargar sucursales:', error);

        tablaSucursales.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    No se pudieron cargar las sucursales.
                </td>
            </tr>
        `;
    }
};

// =====================================
// LIMPIAR FORMULARIO
// =====================================
const limpiarFormulario = () => {
    formSucursal.reset();
    idSucursalEditar = null;

    btnGuardarSucursal.disabled = false;
    btnGuardarSucursal.textContent = 'Guardar sucursal';
};

// =====================================
// ABRIR MODAL PARA NUEVA SUCURSAL
// =====================================
btnNuevaSucursal.addEventListener('click', () => {
    limpiarFormulario();

    tituloModalSucursal.textContent = 'Nueva sucursal';

    modalSucursal.show();
});

// =====================================
// CREAR O ACTUALIZAR SUCURSAL
// =====================================
formSucursal.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const datosSucursal = {
        nombre: document.querySelector('#nombreSucursal').value.trim(),
        direccion: document.querySelector('#direccionSucursal').value.trim(),
        telefono: document.querySelector('#telefonoSucursal').value.trim(),
        activo: document.querySelector('#activoSucursal').checked
    };

    if (!datosSucursal.nombre || !datosSucursal.direccion) {
        alert('El nombre y la dirección son obligatorios.');
        return;
    }

    const estaEditando = idSucursalEditar !== null;

    const url = estaEditando
        ? `/sucursales/${idSucursalEditar}`
        : '/sucursales';

    const metodo = estaEditando ? 'PUT' : 'POST';

    try {
        btnGuardarSucursal.disabled = true;
        btnGuardarSucursal.textContent = 'Guardando...';

        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosSucursal)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            alert(resultado.error || 'No se pudo guardar la sucursal.');
            return;
        }

        alert(
            estaEditando
                ? 'Sucursal actualizada correctamente.'
                : 'Sucursal guardada correctamente.'
        );

        modalSucursal.hide();
        limpiarFormulario();

        await cargarSucursales();

    } catch (error) {
        console.error('Error al guardar sucursal:', error);
        alert('No se pudo conectar con el servidor.');

    } finally {
        btnGuardarSucursal.disabled = false;
        btnGuardarSucursal.textContent = estaEditando
            ? 'Actualizar sucursal'
            : 'Guardar sucursal';
    }
});

// =====================================
// EDITAR SUCURSAL
// =====================================
tablaSucursales.addEventListener('click', async (evento) => {
    const botonEditar = evento.target.closest('.btn-editar');

    if (!botonEditar) {
        return;
    }

    const id = botonEditar.dataset.id;

    try {
        const respuesta = await fetch(`/sucursales/${id}`);
        const sucursal = await respuesta.json();

        if (!respuesta.ok) {
            alert(sucursal.error || 'No se pudo obtener la sucursal.');
            return;
        }

        if (!sucursal || !sucursal.id_sucursal) {
            alert('No se encontró la sucursal.');
            return;
        }

        idSucursalEditar = sucursal.id_sucursal;

        document.querySelector('#nombreSucursal').value =
            sucursal.nombre || '';

        document.querySelector('#direccionSucursal').value =
            sucursal.direccion || '';

        document.querySelector('#telefonoSucursal').value =
            sucursal.telefono || '';

        document.querySelector('#activoSucursal').checked =
            Boolean(sucursal.activo);

        tituloModalSucursal.textContent = 'Editar sucursal';

        btnGuardarSucursal.textContent = 'Actualizar sucursal';

        modalSucursal.show();

    } catch (error) {
        console.error('Error al obtener sucursal:', error);
        alert('No se pudo conectar con el servidor.');
    }
});

// =====================================
// ELIMINAR SUCURSAL
// =====================================
tablaSucursales.addEventListener('click', async (evento) => {
    const botonEliminar = evento.target.closest('.btn-eliminar');

    if (!botonEliminar) {
        return;
    }

    const id = botonEliminar.dataset.id;

    const confirmar = confirm(
        '¿Estás seguro de que deseas eliminar esta sucursal?'
    );

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(`/sucursales/${id}`, {
            method: 'DELETE'
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            alert(resultado.error || 'No se pudo eliminar la sucursal.');
            return;
        }

        alert(resultado.mensaje || 'Sucursal eliminada correctamente.');

        await cargarSucursales();

    } catch (error) {
        console.error('Error al eliminar sucursal:', error);
        alert('No se pudo conectar con el servidor.');
    }
});

// =====================================
// INICIAR MÓDULO
// =====================================
cargarSucursales();
