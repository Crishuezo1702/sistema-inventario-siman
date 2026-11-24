
const API_URL = "http://localhost:8080";

const parametros = new URLSearchParams(window.location.search);
const idMovimiento = parametros.get("id");

const numeroMovimiento = document.querySelector("#numeroMovimiento");
const tablaDetalles = document.querySelector("#tablaDetalles");

const btnNuevoDetalle = document.querySelector("#btnNuevoDetalle");
const modalDetalle = document.querySelector("#modalDetalle");
const formDetalle = document.querySelector("#formDetalle");

const productoDetalle = document.querySelector("#productoDetalle");
const cantidadDetalle = document.querySelector("#cantidadDetalle");
const tituloModalDetalle = document.querySelector("#tituloModalDetalle");

const modal = new bootstrap.Modal(modalDetalle);

let idDetalleEditar = null;
let productos = [];

// ========================================
// CARGAR PRODUCTOS
// ========================================

async function cargarProductos() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`);

        if (!respuesta.ok) {
            throw new Error("Error al obtener productos");
        }

        productos = await respuesta.json();

        productoDetalle.innerHTML = `
            <option value="">Selecciona un producto</option>
        `;

        productos.forEach(producto => {
            productoDetalle.innerHTML += `
                <option value="${producto.id_producto}">
                    ${producto.nombre}
                </option>
            `;
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
        alert("No se pudieron cargar los productos");
    }
}

// ========================================
// CARGAR DETALLES DEL MOVIMIENTO
// ========================================

async function cargarDetalles() {
    try {
        const respuesta = await fetch(
            `${API_URL}/detalles-movimiento`
        );

        if (!respuesta.ok) {
            throw new Error("Error al obtener detalles");
        }

        const detalles = await respuesta.json();

        const detallesMovimiento = detalles.filter(detalle =>
            Number(detalle.id_movimiento) === Number(idMovimiento)
        );

        tablaDetalles.innerHTML = "";

        if (detallesMovimiento.length === 0) {
            tablaDetalles.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        Este movimiento todavía no tiene productos.
                    </td>
                </tr>
            `;
            return;
        }

        detallesMovimiento.forEach(detalle => {

            const producto = productos.find(p =>
                Number(p.id_producto) === Number(detalle.id_producto)
            );

            const nombreProducto = producto
                ? producto.nombre
                : `Producto #${detalle.id_producto}`;

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${detalle.id_detalle}</td>
                <td>${nombreProducto}</td>
                <td>${detalle.cantidad}</td>

                <td>
                    <button
                        class="btn btn-sm btn-warning btn-editar"
                        data-id="${detalle.id_detalle}"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-sm btn-danger btn-eliminar"
                        data-id="${detalle.id_detalle}"
                    >
                        Eliminar
                    </button>
                </td>
            `;

            tablaDetalles.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar detalles:", error);

        tablaDetalles.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">
                    Error al cargar los detalles.
                </td>
            </tr>
        `;
    }
}

// ========================================
// NUEVO DETALLE
// ========================================

btnNuevoDetalle.addEventListener("click", () => {

    idDetalleEditar = null;

    formDetalle.reset();

    tituloModalDetalle.textContent = "Agregar producto";

    modal.show();
});

// ========================================
// GUARDAR DETALLE
// ========================================

formDetalle.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const detalle = {
        id_movimiento: Number(idMovimiento),
        id_producto: Number(productoDetalle.value),
        cantidad: Number(cantidadDetalle.value)
    };

    try {

        let respuesta;

        if (idDetalleEditar) {

            respuesta = await fetch(
                `${API_URL}/detalles-movimiento/${idDetalleEditar}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(detalle)
                }
            );

        } else {

            respuesta = await fetch(
                `${API_URL}/detalles-movimiento`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(detalle)
                }
            );

        }

        if (!respuesta.ok) {
            const mensaje = await respuesta.text();
            throw new Error(mensaje || "No se pudo guardar el detalle");
        }

        alert(
            idDetalleEditar
                ? "Detalle actualizado correctamente"
                : "Producto agregado correctamente"
        );

        modal.hide();
        formDetalle.reset();
        idDetalleEditar = null;

        await cargarDetalles();

    } catch (error) {
        console.error("Error al guardar detalle:", error);
        alert("No se pudo guardar el detalle. Revisa los datos y el backend.");
    }
});

// ========================================
// EDITAR Y ELIMINAR DETALLES
// ========================================

tablaDetalles.addEventListener("click", async (evento) => {

    const botonEditar = evento.target.closest(".btn-editar");
    const botonEliminar = evento.target.closest(".btn-eliminar");

    // EDITAR

    if (botonEditar) {

        const id = botonEditar.dataset.id;

        try {

            const respuesta = await fetch(
                `${API_URL}/detalles-movimiento/${id}`
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo obtener el detalle");
            }

            const detalle = await respuesta.json();

            idDetalleEditar = detalle.id_detalle;

            tituloModalDetalle.textContent = "Editar detalle";

            productoDetalle.value = detalle.id_producto;
            cantidadDetalle.value = detalle.cantidad;

            modal.show();

        } catch (error) {
            console.error(error);
            alert("No se pudo obtener el detalle");
        }

        return;
    }

    // ELIMINAR

    if (botonEliminar) {

        const id = botonEliminar.dataset.id;

        const confirmar = confirm(
            "¿Estás seguro de eliminar este detalle?"
        );

        if (!confirmar) return;

        try {

            const respuesta = await fetch(
                `${API_URL}/detalles-movimiento/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar el detalle");
            }

            alert("Detalle eliminado correctamente");

            await cargarDetalles();

        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el detalle");
        }
    }
});

// ========================================
// INICIALIZAR
// ========================================

async function iniciarPagina() {

    if (!idMovimiento || isNaN(Number(idMovimiento))) {
        alert("No se recibió un ID de movimiento válido");
        window.location.href = "movimientos.html";
        return;
    }

    numeroMovimiento.textContent = idMovimiento;

    await cargarProductos();
    await cargarDetalles();
}

iniciarPagina();
