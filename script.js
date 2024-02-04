// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Configurar secciones
    const secciones = [
        { nombre: 'inicio', archivo: 'inicio.html' },
        { nombre: 'sobremi', archivo: 'sobremi.html' },
        { nombre: 'skills', archivo: 'skills.html' },
        { nombre: 'curriculum', archivo: 'curriculum.html' },
        { nombre: 'portafolio', archivo: 'portafolio.html' },
        { nombre: 'contacto', archivo: 'contacto.html' },
        // Agrega más secciones según sea necesario
    ];

    // Cargar la sección de inicio por defecto
    cargarSeccion(secciones[0].nombre);

    // Configurar eventos de clic para la navegación
    document.querySelectorAll('nav a').forEach(enlace => {
        enlace.addEventListener('click', function (event) {
            event.preventDefault();
            var seccion = this.getAttribute('href').substring(1); // Eliminar el signo de "#" del href
            cargarSeccion(seccion);
        });
    });

    // Configurar evento de clic para el botón de regreso arriba
    document.querySelector('.arriba').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Configurar evento de clic para mostrar/ocultar menú en dispositivos móviles
    document.querySelector('.nav-responsive').addEventListener('click', function () {
        mostrarOcultarMenu();
    });

    // Configurar evento de submit para la validación de formulario
    document.getElementById("formulario").addEventListener("submit", function (event) {
        // Agrega la lógica de validación aquí

        // Si la validación falla, evita que el formulario se envíe
        event.preventDefault();
    });

    // Configurar evento de scroll para agregar clases de animación
    window.addEventListener('scroll', function () {
        var scrollPosition = window.scrollY;

        // Agrega clases de animación cuando se desplaza a ciertas secciones
        secciones.forEach(seccion => {
            agregarClaseConScroll(`#${seccion.nombre}`, `animacion-${seccion.nombre}`, scrollPosition);
        });
    });

    // Función para cargar una sección dinámicamente
    function cargarSeccion(nombreSeccion) {
        const seccionConfig = secciones.find(seccion => seccion.nombre === nombreSeccion);
        if (seccionConfig) {
            const rutaArchivo = `secciones/${seccionConfig.archivo}`;

            fetch(rutaArchivo)
                .then(response => response.text())
                .then(html => {
                    document.querySelector('.contenedor-contenido').innerHTML = html;
                })
                .catch(error => console.error('Error al cargar la sección', error));
        }
    }

    // Función para agregar clases de animación con scroll
    function agregarClaseConScroll(elementoId, clase, scrollPosition) {
        var elemento = document.querySelector(elementoId);

        if (elemento && scrollPosition > elemento.offsetTop - window.innerHeight / 2) {
            elemento.classList.add(clase);
        }
    }

    // Función para mostrar/ocultar menú en dispositivos móviles
    function mostrarOcultarMenu() {
        var nav = document.getElementById("nav");
        nav.classList.toggle("mostrar-menu");
    }
});
