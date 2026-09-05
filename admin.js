/* ============================================================
   DATOS INICIALES (simulando base de datos)
   ============================================================ */

const serviciosIniciales = [
    {
        id: 1,
        nombre: 'Consulta general',
        descripcion: 'Revisión médica, diagnóstico y seguimiento de la mascota.',
        categoria: 'Control'
    },
    {
        id: 2,
        nombre: 'Vacunación',
        descripcion: 'Aplicación y control del calendario de vacunas.',
        categoria: 'Prevención'
    },
    {
        id: 3,
        nombre: 'Cirugía menor',
        descripcion: 'Procedimientos quirúrgicos ambulatorios.',
        categoria: 'Tratamiento'
    },
    {
        id: 4,
        nombre: 'Desparasitación',
        descripcion: 'Control de parásitos internos y externos.',
        categoria: 'Prevención'
    }
];

const usuariosIniciales = [
    {
        id: 1,
        nombre: 'Administrador principal',
        email: 'admin@sanmarcos.cl',
        rol: 'Administrador',
        estado: 'Activo'
    },
    {
        id: 2,
        nombre: 'Cliente de prueba',
        email: 'cliente@correo.cl',
        rol: 'Cliente',
        estado: 'Activo'
    }
];

const citasIniciales = [];

/* ============================================================
   CARGAR DATOS DESDE LOCALSTORAGE O USAR INICIALES
   ============================================================ */

let servicios = JSON.parse(
    localStorage.getItem('servicios')
) || serviciosIniciales;

let usuarios = JSON.parse(
    localStorage.getItem('usuarios')
) || usuariosIniciales;

let citas = JSON.parse(
    localStorage.getItem('citas')
) || citasIniciales;

/* ============================================================
   REFERENCIAS A ELEMENTOS DEL DOM
   ============================================================ */

const serviciosLista = document.getElementById('servicios-lista');
const usuariosTabla = document.getElementById('usuarios-tabla');
const citasTabla = document.getElementById('citas-tabla');

const servicioForm = document.getElementById('servicio-form');
const usuarioForm = document.getElementById('usuario-form');
const citaForm = document.getElementById('cita-form');

/* ============================================================
   FUNCIONES GENERALES
   ============================================================ */

function guardarDatos() {
    localStorage.setItem('servicios', JSON.stringify(servicios));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('citas', JSON.stringify(citas));
}

function formatoFecha(fechaISO) {
    const d = new Date(fechaISO);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    const horas = String(d.getHours()).padStart(2, '0');
    const minutos = String(d.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

function mostrarMensaje(id, texto, tipo) {
    const mensaje = document.getElementById(id);

    mensaje.textContent = texto;
    mensaje.className = `admin-message ${tipo}`;

    setTimeout(() => {
        mensaje.textContent = '';
        mensaje.className = 'admin-message';
    }, 2500);
}

/* ============================================================
   MANTENEDOR DE SERVICIOS
   ============================================================ */

function mostrarServicios() {
    serviciosLista.innerHTML = '';

    servicios.forEach((servicio) => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'admin-item';

        tarjeta.innerHTML = `
            <span class="admin-item-icon">🩺</span>
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <small>Categoría: ${servicio.categoria}</small>

            <div class="item-actions">
                <button
                    class="btn-small btn-edit"
                    onclick="editarServicio(${servicio.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-small btn-delete"
                    onclick="eliminarServicio(${servicio.id})"
                >
                    Eliminar
                </button>
            </div>
        `;

        serviciosLista.appendChild(tarjeta);
    });

    document.getElementById('total-servicios').textContent = servicios.length;
}

document
    .getElementById('nuevo-servicio-button')
    .addEventListener('click', () => {
        servicioForm.reset();

        document.getElementById('servicio-id').value = '';
        document.getElementById('servicio-form-title').textContent =
            'Agregar servicio';

        servicioForm.classList.remove('hidden');
        servicioForm.scrollIntoView({ behavior: 'smooth' });
    });

servicioForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('servicio-id').value;
    const nombre = document.getElementById('servicio-nombre').value.trim();
    const descripcion = document.getElementById('servicio-descripcion').value.trim();
    const categoria = document.getElementById('servicio-categoria').value;

    if (!nombre || !descripcion || !categoria) {
        mostrarMensaje('servicio-message', 'Completa todos los campos.', 'error');
        return;
    }

    if (id) {
        const servicio = servicios.find((item) => item.id === Number(id));
        servicio.nombre = nombre;
        servicio.descripcion = descripcion;
        servicio.categoria = categoria;
    } else {
        servicios.push({
            id: Date.now(),
            nombre,
            descripcion,
            categoria
        });
    }

    guardarDatos();
    mostrarServicios();

    mostrarMensaje('servicio-message', 'Servicio guardado correctamente.', 'success');

    setTimeout(() => {
        servicioForm.classList.add('hidden');
    }, 800);
});

document
    .getElementById('cancelar-servicio-button')
    .addEventListener('click', () => {
        servicioForm.classList.add('hidden');
    });

function editarServicio(id) {
    const servicio = servicios.find((item) => item.id === id);

    document.getElementById('servicio-id').value = servicio.id;
    document.getElementById('servicio-nombre').value = servicio.nombre;
    document.getElementById('servicio-descripcion').value = servicio.descripcion;
    document.getElementById('servicio-categoria').value = servicio.categoria;

    document.getElementById('servicio-form-title').textContent = 'Editar servicio';

    servicioForm.classList.remove('hidden');
    servicioForm.scrollIntoView({ behavior: 'smooth' });
}

function eliminarServicio(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar este servicio?');

    if (!confirmar) {
        return;
    }

    servicios = servicios.filter((servicio) => servicio.id !== id);

    guardarDatos();
    mostrarServicios();
}

/* ============================================================
   MANTENEDOR DE USUARIOS
   ============================================================ */

function mostrarUsuarios() {
    usuariosTabla.innerHTML = '';

    usuarios.forEach((usuario) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${usuario.email}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.rol}</td>
            <td>
                <span class="status-${usuario.estado.toLowerCase()}">
                    ${usuario.estado}
                </span>
            </td>
            <td>
                <button
                    class="btn-small btn-edit"
                    onclick="editarUsuario(${usuario.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-small btn-delete"
                    onclick="cambiarEstadoUsuario(${usuario.id})"
                >
                    ${usuario.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                </button>
            </td>
        `;

        usuariosTabla.appendChild(fila);
    });

    document.getElementById('total-usuarios').textContent = usuarios.length;
}

document
    .getElementById('nuevo-usuario-button')
    .addEventListener('click', () => {
        usuarioForm.reset();

        document.getElementById('usuario-id').value = '';
        document.getElementById('usuario-form-title').textContent =
            'Agregar usuario';

        usuarioForm.classList.remove('hidden');
        usuarioForm.scrollIntoView({ behavior: 'smooth' });
    });

usuarioForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('usuario-id').value;
    const nombre = document.getElementById('usuario-nombre').value.trim();
    const email = document.getElementById('usuario-email').value.trim();
    const rol = document.getElementById('usuario-rol').value;
    const estado = document.getElementById('usuario-estado').value;

    if (!nombre || !email || !rol || !estado) {
        mostrarMensaje('usuario-message', 'Completa todos los campos.', 'error');
        return;
    }

    if (id) {
        const usuario = usuarios.find((item) => item.id === Number(id));
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.rol = rol;
        usuario.estado = estado;
    } else {
        usuarios.push({
            id: Date.now(),
            nombre,
            email,
            rol,
            estado
        });
    }

    guardarDatos();
    mostrarUsuarios();

    mostrarMensaje('usuario-message', 'Usuario guardado correctamente.', 'success');

    setTimeout(() => {
        usuarioForm.classList.add('hidden');
    }, 800);
});

document
    .getElementById('cancelar-usuario-button')
    .addEventListener('click', () => {
        usuarioForm.classList.add('hidden');
    });

function editarUsuario(id) {
    const usuario = usuarios.find((item) => item.id === id);

    document.getElementById('usuario-id').value = usuario.id;
    document.getElementById('usuario-nombre').value = usuario.nombre;
    document.getElementById('usuario-email').value = usuario.email;
    document.getElementById('usuario-rol').value = usuario.rol;
    document.getElementById('usuario-estado').value = usuario.estado;

    document.getElementById('usuario-form-title').textContent = 'Editar usuario';

    usuarioForm.classList.remove('hidden');
    usuarioForm.scrollIntoView({ behavior: 'smooth' });
}

function cambiarEstadoUsuario(id) {
    const usuario = usuarios.find((item) => item.id === id);

    usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';

    guardarDatos();
    mostrarUsuarios();
}

/* ============================================================
   MANTENEDOR DE CITAS
   ============================================================ */

function mostrarCitas() {
    citasTabla.innerHTML = '';

    const selectServicio = document.getElementById('cita-servicio');
    selectServicio.innerHTML = '<option value="">Selecciona un servicio</option>';

    servicios.forEach((servicio) => {
        const opcion = document.createElement('option');
        opcion.value = servicio.nombre;
        opcion.textContent = servicio.nombre;
        selectServicio.appendChild(opcion);
    });

    // Llenar la tabla de citas
    citas.forEach((cita) => {
        const fila = document.createElement('tr');

        const servicioMostrar = cita.servicio || '(Sin servicio)';

        fila.innerHTML = `
            <td>${cita.dueno}</td>
            <td>${cita.mascota}</td>
            <td>${servicioMostrar}</td>
            <td>${formatoFecha(cita.fecha)}</td>
            <td>${cita.estado}</td>
            <td>
                <button
                    class="btn-small btn-edit"
                    onclick="editarCita(${cita.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-small btn-delete"
                    onclick="eliminarCita(${cita.id})"
                >
                    Eliminar
                </button>
            </td>
        `;

        citasTabla.appendChild(fila);
    });

    document.getElementById('total-citas').textContent =
        citas.filter((cita) => cita.estado === 'Pendiente').length;
}

document
    .getElementById('nueva-cita-button')
    .addEventListener('click', () => {
        citaForm.reset();

        document.getElementById('cita-id').value = '';
        document.getElementById('cita-form-title').textContent = 'Agregar cita';

        citaForm.classList.remove('hidden');
        citaForm.scrollIntoView({ behavior: 'smooth' });
    });

citaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('cita-id').value;
    const dueno = document.getElementById('cita-dueno').value.trim();
    const mascota = document.getElementById('cita-mascota').value.trim();
    const servicio = document.getElementById('cita-servicio').value;
    const fecha = document.getElementById('cita-fecha').value;
    const estado = document.getElementById('cita-estado').value;

    if (!dueno || !mascota || !servicio || !fecha || !estado) {
        mostrarMensaje('cita-message', 'Completa todos los campos.', 'error');
        return;
    }

    if (id) {
        const cita = citas.find((item) => item.id === Number(id));
        cita.dueno = dueno;
        cita.mascota = mascota;
        cita.servicio = servicio;
        cita.fecha = fecha;
        cita.estado = estado;
    } else {
        citas.push({
            id: Date.now(),
            dueno,
            mascota,
            servicio,
            fecha,
            estado
        });
    }

    guardarDatos();
    mostrarCitas();

    mostrarMensaje('cita-message', 'Cita guardada correctamente.', 'success');

    setTimeout(() => {
        citaForm.classList.add('hidden');
    }, 800);
});

document
    .getElementById('cancelar-cita-button')
    .addEventListener('click', () => {
        citaForm.classList.add('hidden');
    });

function editarCita(id) {
    const cita = citas.find((item) => item.id === id);

    document.getElementById('cita-id').value = cita.id;
    document.getElementById('cita-dueno').value = cita.dueno;
    document.getElementById('cita-mascota').value = cita.mascota;
    document.getElementById('cita-servicio').value = cita.servicio;
    document.getElementById('cita-fecha').value = cita.fecha;
    document.getElementById('cita-estado').value = cita.estado;

    document.getElementById('cita-form-title').textContent = 'Editar cita';

    citaForm.classList.remove('hidden');
    citaForm.scrollIntoView({ behavior: 'smooth' });
}

function eliminarCita(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar esta cita?');

    if (!confirmar) {
        return;
    }

    citas = citas.filter((cita) => cita.id !== id);

    guardarDatos();
    mostrarCitas();
}

/* ============================================================
   CERRAR SESIÓN
   ============================================================ */

document
    .getElementById('logout-button')
    .addEventListener('click', () => {
        localStorage.removeItem('usuarioLogueado');
        window.location.href = 'login.html';
    });

/* ============================================================
   INICIALIZAR PANEL
   ============================================================ */

mostrarServicios();
mostrarUsuarios();
mostrarCitas();