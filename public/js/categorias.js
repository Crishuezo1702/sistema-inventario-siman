
const tablaCategorias = document.querySelector('#tablaCategorias');
let idCategoriaEditando = null;

const cargarCategorias = async () => {
    try {
        const respuesta = await fetch('/categorias');

        if (!respuesta.ok) {
            throw new Error('No se pudieron obtener las categorías');
        }

        const categorias = await respuesta.json();

        tablaCategorias.replaceChildren();

        if (categorias.length === 0) {
            mostrarMensaje('No hay categorías registradas');
            return;
        }

        categorias.forEach(categoria => {
            const fila = document.createElement('tr');

            const valores = [
                categoria.id_categoria,
                categoria.nombre,
                categoria.descripcion ?? '',
                Number(categoria.activo) === 1 || categoria.activo === true
                    ? 'Activo'
                    : 'Inactivo'
            ];

            valores.forEach(valor => {
                const celda = document.createElement('td');
                celda.textContent = valor ?? '';
                fila.appendChild(celda);
            });

            
const celdaAcciones = document.createElement('td');

const btnEditar = document.createElement('button');
btnEditar.textContent = 'Editar';
btnEditar.className = 'btn btn-warning btn-sm';

btnEditar.addEventListener('click', () => {
    idCategoriaEditando = categoria.id_categoria

    document.querySelector('#nombreCategoria').value = categoria.nombre;
    document.querySelector('#descripcionCategoria').value =
        categoria.descripcion ?? '';

    document.querySelector('#activoCategoria').checked =
        Number(categoria.activo) === 1 || categoria.activo === true;

    document.querySelector('#tituloModalCategoria').textContent =
        'Editar categoría';

    document.querySelector('#btnGuardarCategoria').textContent =
        'Actualizar categoría';

    ventanaCategoria.show();
});


const btnEliminar = document.createElement('button');
btnEliminar.textContent = 'Eliminar';
btnEliminar.className = 'btn btn-danger btn-sm ms-2';

btnEliminar.addEventListener('click', async () => {
    const confirmar = confirm(
        `¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`
    );

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(
            `/categorias/${categoria.id_categoria}`,
            {
                method: 'DELETE'
            }
        );

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                resultado.error || 'No se pudo eliminar la categoría'
            );
        }

        alert('Categoría eliminada correctamente');

        await cargarCategorias();

    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        alert(error.message);
    }
});

celdaAcciones.appendChild(btnEditar);
celdaAcciones.appendChild(btnEliminar);



fila.appendChild(celdaAcciones);



tablaCategorias.appendChild(fila);

        });

    } catch (error) {
        console.error('Error al cargar las categorías:', error);
        mostrarMensaje('No se pudieron cargar las categorías');
    }
};

const mostrarMensaje = (mensaje) => {
    tablaCategorias.replaceChildren();

    const fila = document.createElement('tr');
    const celda = document.createElement('td');

    celda.colSpan = 5;
    celda.className = 'text-center';
    celda.textContent = mensaje;

    fila.appendChild(celda);
    tablaCategorias.appendChild(fila);
};

document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
});

const btnNuevaCategoria = document.querySelector('#btnNuevaCategoria');

const ventanaCategoria = new bootstrap.Modal(
    document.querySelector('#modalCategoria')
);

btnNuevaCategoria.addEventListener('click', ()=>{
    idCategoriaEditando = null
    document.querySelector('#formCategoria').reset();

    document.querySelector('#tituloModalCategoria').textContent =
        'Nueva categoría';

    document.querySelector('#btnGuardarCategoria').textContent = 
        'Guardar categoría';
    
    ventanaCategoria.show();
});

const formCategoria = document.querySelector('#formCategoria');

formCategoria.addEventListener('submit', async(evento) =>{
    evento.preventDefault();

    const categoria = {
        nombre: document.querySelector('#nombreCategoria').value.trim(),
        descripcion: document.querySelector('#descripcionCategoria').value.trim(),
        activo: document.querySelector('#activoCategoria').checked
    };

    try{
        
        const editando = idCategoriaEditando !== null;

        const url = editando
            ? `/categorias/${idCategoriaEditando}`
            : '/categorias';

        const respuesta = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
        });

        const resultado = await respuesta.json();

        if(!respuesta.ok){
            throw new Error(
                resultado.error || 'No se pudo crear la categoría'
            );
        }

       alert(editando
            ? 'Categoría actualizada correctamente'
            : 'Categoría creada correctamente'
        );

        idCategoriaEditando = null;

        formCategoria.reset();
        ventanaCategoria.hide();

        document.querySelector('#tituloModalCategoria').textContent =
            'Nueva categoría';

        document.querySelector('#btnGuardarCategoria').textContent =
            'Guardar categoría';

        await cargarCategorias();
    } catch (error) {
        console.error('Error al crear la categoria:', error);
        alert(error.message)
    }
});