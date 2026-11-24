
const API_URL = "http://localhost:8080";

const tablaMovimientos = document.querySelector("#tablaMovimientos");
const modalMovimiento = document.querySelector("#modalMovimiento");
const formMovimiento = document.querySelector("#formMovimiento");

const btnNuevoMovimiento = document.querySelector("#btnNuevoMovimiento");
const tituloModalMovimiento = document.querySelector("#tituloModalMovimiento");

const tipoMovimiento = document.querySelector("#tipoMovimiento");
const sucursalMovimiento = document.querySelector("#sucursalMovimiento");
const usuarioMovimiento = document.querySelector("#usuarioMovimiento");
const observacionMovimiento = document.querySelector("#observacionMovimiento");

const btnGuardarMovimiento = document.querySelector("#btnGuardarMovimiento");

let idMovimientoEditar = null;

const modal = new bootstrap.Modal(modalMovimiento);

// ========================================
// CARGAR SUCURSALES
// ========================================

async function cargarSucursales() {
    try {
        const respuesta = await fetch(`${API_URL}/sucursales`);
        const sucursales = await respuesta.json();

        sucursalMovimiento.innerHTML = `
            <option value="">Selecciona una sucursal</option>
        `;

        sucursales
            .filter(sucursal => sucursal.activo === 1 || sucursal.activo === true)
            .forEach(sucursal => {
                sucursalMovimiento.innerHTML += `
                    <option value="${sucursal.id_sucursal}">
                        ${sucursal.nombre}
                    </option>
                `;
            });

    } catch (error) {
        console.error("Error al cargar sucursales:", error);
    }
}

// ========================================
// CARGAR USUARIOS
// ========================================

async function cargarUsuarios() {
    try {
        const respuesta = await fetch(`${API_URL}/usuarios`);
        const usuarios = await respuesta.json();

        usuarioMovimiento.innerHTML = `
            <option value="">Selecciona un usuario</option>
        `;

        usuarios
            .filter(usuario => usuario.activo === 1 || usuario.activo === true)
            .forEach(usuario => {
                usuarioMovimiento.innerHTML += `
                    <option value="${usuario.id_usuario}">
                        ${usuario.nombre}
                    </option>
                `;
            });

    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
}

// ========================================
// CARGAR MOVIMIENTOS
// ========================================

async function cargarMovimientos() {
    try {
        const respuesta = await fetch(`${API_URL}/movimientos`);

        if (!respuesta.ok) {
            throw new Error("Error al obtener movimientos");
        }

        const movimientos = await respuesta.json();

        tablaMovimientos.innerHTML = "";

        movimientos.forEach(movimiento => {

            const fila = document.createElement("tr");

            const tipoBadge =
                movimiento.tipo === "ENTRADA"
                    ? "bg-success"
                    : "bg-danger";

            const fecha = movimiento.fecha_movimiento
                ? new Date(movimiento.fecha_movimiento).toLocaleString("es-SV")
                : "";

            fila.innerHTML = `
                <td>${movimiento.id_movimiento}</td>

                <td>
                    <span class="badge ${tipoBadge}">
                        ${movimiento.tipo}
                    </span>
                </td>

                <td>
                    ${movimiento.nombre_sucursal || movimiento.id_sucursal}
                </td>

                <td>
                    ${movimiento.nombre_usuario || movimiento.id_usuario}
                </td>

                <td>${fecha}</td>

                <td>
                    ${movimiento.observacion || ""}
                </td>

                <td>
                    <button
                        type="button"
                        class="btn btn-sm btn-info btn-detalles"
                        data-id="${movimiento.id_movimiento}"
                    >
                        Detalles
                    </button>

                    <button
                        type="button"
                        class="btn btn-sm btn-warning btn-editar"
                        data-id="${movimiento.id_movimiento}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn btn-sm btn-danger btn-eliminar"
                        data-id="${movimiento.id_movimiento}"
                    >
                        Eliminar
                    </button>
                </td>
            `;

            tablaMovimientos.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar movimientos:", error);
    }
}

// ========================================
// NUEVO MOVIMIENTO
// ========================================

btnNuevoMovimiento.addEventListener("click", async () => {

    idMovimientoEditar = null;

    formMovimiento.reset();

    tituloModalMovimiento.textContent = "Nuevo Movimiento";

    await cargarSucursales();
    await cargarUsuarios();

    modal.show();
});

// ========================================
// GUARDAR MOVIMIENTO
// ========================================

formMovimiento.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const movimiento = {
        tipo: tipoMovimiento.value,
        id_sucursal: Number(sucursalMovimiento.value),
        id_usuario: Number(usuarioMovimiento.value),
        observacion: observacionMovimiento.value.trim()
    };

    try {

        let respuesta;

        if (idMovimientoEditar) {

            respuesta = await fetch(
                `${API_URL}/movimientos/${idMovimientoEditar}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movimiento)
                }
            );

        } else {

            respuesta = await fetch(`${API_URL}/movimientos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movimiento)
            });

        }

        if (!respuesta.ok) {
            throw new Error("No se pudo guardar el movimiento");
        }

        alert(
            idMovimientoEditar
                ? "Movimiento actualizado correctamente"
                : "Movimiento creado correctamente"
        );

        modal.hide();

        formMovimiento.reset();

        idMovimientoEditar = null;

        cargarMovimientos();

    } catch (error) {
        console.error("Error al guardar movimiento:", error);
        alert("Error al guardar el movimiento");
    }
});

// ========================================
// EDITAR Y ELIMINAR MOVIMIENTO
// ========================================

tablaMovimientos.addEventListener("click", async (evento) => {

    const botonEditar = evento.target.closest(".btn-editar");
    const botonEliminar = evento.target.closest(".btn-eliminar");

    // EDITAR

    if (botonEditar) {

        const idMovimiento = botonEditar.dataset.id;

        try {

            const respuesta = await fetch(
                `${API_URL}/movimientos/${idMovimiento}`
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo obtener el movimiento");
            }

            const movimiento = await respuesta.json();

            idMovimientoEditar = movimiento.id_movimiento;

            tituloModalMovimiento.textContent = "Editar Movimiento";

            await cargarSucursales();
            await cargarUsuarios();

            tipoMovimiento.value = movimiento.tipo;
            sucursalMovimiento.value = movimiento.id_sucursal;
            usuarioMovimiento.value = movimiento.id_usuario;
            observacionMovimiento.value = movimiento.observacion || "";

            modal.show();

        } catch (error) {
            console.error("Error al obtener movimiento:", error);
            alert("Error al obtener el movimiento");
        }

        return;
    }

    // ELIMINAR

    if (botonEliminar) {

        const idMovimiento = botonEliminar.dataset.id;

        const confirmar = confirm(
            "¿Estás seguro de eliminar este movimiento?"
        );

        if (!confirmar) {
            return;
        }

        try {

            const respuesta = await fetch(
                `${API_URL}/movimientos/${idMovimiento}`,
                {
                    method: "DELETE"
                }
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar el movimiento");
            }

            alert("Movimiento eliminado correctamente");

            cargarMovimientos();

        } catch (error) {
            console.error("Error al eliminar movimiento:", error);
            alert("Error al eliminar el movimiento");
        }
    }
});

// ========================================
// BOTÓN DETALLES
// ========================================

tablaMovimientos.addEventListener("click", (evento) => {

    const botonDetalles = evento.target.closest(".btn-detalles");

    if (!botonDetalles) {
        return;
    }

    const idMovimiento = botonDetalles.dataset.id;

    window.location.href =
        `detalles-movimiento.html?id=${idMovimiento}`;
});

// ========================================
// INICIALIZAR
// ========================================

cargarSucursales();
cargarUsuarios();
cargarMovimientos();
