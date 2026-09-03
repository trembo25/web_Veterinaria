let servicio = JSON.parse(localStorage.getItem("servicioSeleccionado"));

document.getElementById("imagenServicio").src = servicio.imagen;
document.getElementById("imagenServicio").alt = servicio.nombre;
document.getElementById("nombre").textContent = servicio.nombre;
document.getElementById("descripcion").textContent = servicio.descripcionLarga;