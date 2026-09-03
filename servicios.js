let Servicios = [
    {
        id: 1,
        nombre: "Consulta General",
        imagen: "img/consulta_general.jpg",
        descripcionCorta: "Revisiones preventivas, diagnósticos precisos y seguimiento médico continuo.",
        descripcionLarga: "La consulta general es el primer paso para cuidar la salud de tu mascota. Nuestros médicos veterinarios realizan un examen físico completo, revisan signos vitales, peso y estado general, y conversan contigo sobre hábitos, alimentación y cualquier síntoma que hayas notado."
    },
    {
        id: 2,
        nombre: "Vacunación",
        imagen: "img/vacunacion.jpg",
        descripcionCorta: "Esquemas de vacunación completos para cachorros y mascotas adultas.",
        descripcionLarga: "Contamos con esquemas de vacunación adaptados a la edad, especie y estilo de vida de tu mascota, protegiéndola contra enfermedades comunes y de alto riesgo. Llevamos un registro digital de cada dosis aplicada para que siempre sepas cuándo corresponde la próxima."
    },
    {
        id: 3,
        nombre: "Cirugía menor",
        imagen: "img/cirugía_menor.jpg",
        descripcionCorta: "Procedimientos quirúrgicos ambulatorios realizados por nuestro equipo veterinario certificado.",
        descripcionLarga: "Realizamos procedimientos quirúrgicos ambulatorios como esterilizaciones, extracción de tumores superficiales y suturas menores, en un pabellón equipado y con protocolos de asepsia adecuados. Tu mascota es monitoreada antes, durante y después del procedimiento."
    },
    {
        id: 4,
        nombre: "Desparasitación",
        imagen: "img/desparasitacion.jpg",
        descripcionCorta: "Control interno y externo de parásitos, adaptado a la edad y especie de tu mascota.",
        descripcionLarga: "La desparasitación regular previene enfermedades transmitidas por pulgas, garrapatas y parásitos internos que pueden afectar seriamente la salud de tu mascota. Evaluamos peso, edad y entorno para definir el producto y la frecuencia más adecuada."
    },
    {
        id: 5,
        nombre: "Control de Peso",
        imagen: "img/control_de_peso.jpg",
        descripcionCorta: "Seguimiento nutricional para mantener a tu mascota en su peso ideal y prevenir enfermedades.",
        descripcionLarga: "El sobrepeso en mascotas está asociado a problemas articulares, cardíacos y de menor expectativa de vida. Evaluamos la condición corporal, definimos un plan nutricional junto a ti y hacemos seguimiento periódico para lograr un peso saludable."
    }
];

function verDetalle(id) {

    let servicioSeleccionado;

    for (let i = 0; i < Servicios.length; i++) {
        if (Servicios[i].id === id) {
            servicioSeleccionado = Servicios[i];
        }
    }

    localStorage.setItem(
        "servicioSeleccionado",
        JSON.stringify(servicioSeleccionado)
    );

    window.location.href = "detalleServicio.html";
}