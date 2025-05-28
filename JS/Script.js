// 📄 INDEX PRINCIPAL (INDEX.HTML)
document.addEventListener("DOMContentLoaded", () => {
    // 📌 Elementos del DOM
    const iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
    const registroBtn = document.getElementById("registroBtn");
    const loginPopup = document.getElementById("loginPopup");
    const registroPopup = document.getElementById("registroPopup");
    const closeLoginPopup = document.getElementById("closeLoginPopup");
    const closeRegistroPopup = document.getElementById("closeRegistroPopup");

    // 📌 Manejo de ventanas emergentes
    if (iniciarSesionBtn && loginPopup && closeLoginPopup) {
        iniciarSesionBtn.addEventListener("click", () => {
            loginPopup.classList.add("popup-active");
            document.body.classList.add("popup-active");
        });

        closeLoginPopup.addEventListener("click", () => {
            loginPopup.classList.remove("popup-active");
            document.body.classList.remove("popup-active");
        });
    }

    if (registroBtn && registroPopup && closeRegistroPopup) {
        registroBtn.addEventListener("click", () => {
            registroPopup.classList.add("popup-active");
            document.body.classList.add("popup-active");
        });

        closeRegistroPopup.addEventListener("click", () => {
            registroPopup.classList.remove("popup-active");
            document.body.classList.remove("popup-active");
        });
    }

    // 📌 Inicio de sesión
    document.getElementById("loginBtn").addEventListener("click", async () => {
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        alert(data.message);

        if (data.usuario) {
            sessionStorage.setItem("usuario", data.usuario);
            window.location.href = "indexEntradas.html";
        }
    });

    // 📌 Registro de usuario
    document.getElementById("registrarBtn").addEventListener("click", async () => {
        const username = document.getElementById("newUsername").value;
        const email = document.getElementById("newEmail").value;
        const password = document.getElementById("newPassword").value;

        const response = await fetch("http://localhost:3000/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        alert(data.message);

        if (data.usuario) {
            sessionStorage.setItem("usuario", data.usuario);
            window.location.href = "indexEntradas.html";
        }
    });
});


// 📄 MENU DE AYUDA
document.addEventListener("DOMContentLoaded", () => {
    // 📌 Elementos del DOM
    const toggleHelpMenu = document.getElementById("toggleHelpMenu");
    const helpOptions = document.querySelector(".help-options");

    const comentarioPopup = document.getElementById("comentarioPopup");
    const infoContactoPopup = document.getElementById("infoContactoPopup");
    const agradecimientoPopup = document.getElementById("agradecimientoPopup");

    const dejarComentario = document.getElementById("dejarComentario");
    const pedirInformacion = document.getElementById("pedirInformacion");

    const closeComentarioPopup = document.getElementById("closeComentarioPopup");
    const closeInfoContactoPopup = document.getElementById("closeInfoContactoPopup");
    const closeAgradecimientoPopup = document.getElementById("closeAgradecimientoPopup");

    const enviarComentario = document.getElementById("enviarComentario");
    const enviarInfoContacto = document.getElementById("enviarInfoContacto");

    const motivoComentario = document.getElementById("motivoComentario");
    const comentarioTexto = document.getElementById("comentarioTexto");

    // 📌 Menú de ayuda desplegable
    toggleHelpMenu.addEventListener("click", () => {
        helpOptions.classList.toggle("visible");
    });

    // 📌 Abrir ventanas emergentes
    dejarComentario.addEventListener("click", () => {
        comentarioPopup.classList.add("popup-active");
    });

    pedirInformacion.addEventListener("click", () => {
        infoContactoPopup.classList.add("popup-active");
    });

    // 📌 Cerrar ventanas emergentes
    closeComentarioPopup.addEventListener("click", () => {
        comentarioPopup.classList.remove("popup-active");
    });

    closeInfoContactoPopup.addEventListener("click", () => {
        infoContactoPopup.classList.remove("popup-active");
    });

    closeAgradecimientoPopup.addEventListener("click", () => {
        agradecimientoPopup.classList.remove("popup-active");
    });

// 📌 Mostrar cuadro de texto al elegir motivo
motivoComentario.addEventListener("change", (event) => {
    const comentarioTexto = document.getElementById("comentarioTexto");
    const enviarComentario = document.getElementById("enviarComentario");

    if (!comentarioTexto || !enviarComentario) {
        console.error("❌ Elementos de comentario no encontrados.");
        return;
    }

    if (event.target.value.trim() !== "") {
        comentarioTexto.style.display = "block";
        enviarComentario.style.display = "block";
        console.log("📌 Motivo seleccionado, mostrando cuadro de texto y botón.");
    } else {
        comentarioTexto.style.display = "none";
        enviarComentario.style.display = "none";
        console.log("❌ Motivo vacío, ocultando cuadro de texto y botón.");
    }
});

// 📌 Validar y enviar comentario
enviarComentario.addEventListener("click", async () => {
    const nombre = document.getElementById("nombreComentario").value.trim();
    const correo = document.getElementById("correoComentario").value.trim();
    const mensaje = comentarioTexto.value.trim();

    if (nombre === "" || correo === "" || mensaje === "") {
        alert("❌ Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/comentario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, correo, motivo: motivoComentario.value, mensaje })
        });

        const data = await response.json();
        alert(data.message);
        comentarioPopup.classList.remove("popup-active");
        agradecimientoPopup.classList.add("popup-active");
    } catch (error) {
        console.error("❌ Error al enviar comentario:", error);
        alert("❌ No se pudo conectar con el servidor.");
    }
});
 

    // 📌 Validar y enviar solicitud de información
    enviarInfoContacto.addEventListener("click", () => {
        const nombre = document.getElementById("nombreInfoContacto").value.trim();
        const correo = document.getElementById("correoInfoContacto").value.trim();
        const mensaje = document.getElementById("mensajeInfoContacto").value.trim();

        if (nombre === "" || correo === "" || mensaje === "") {
            alert("❌ Todos los campos son obligatorios.");
            return;
        }

        alert("✅ Solicitud enviada correctamente.");
        infoContactoPopup.classList.remove("popup-active");
    });
});


// 📄 INDEX ENTRADAS
document.addEventListener("DOMContentLoaded", () => {
    // 📌 Elementos del DOM
    const moodButtons = document.querySelectorAll(".mood-btn");
    const entradaForm = document.getElementById("entrada-form");
    const entradaText = document.getElementById("entrada-text");
    const listaEntradas = document.getElementById("lista-entradas");
    const graficoCanvas = document.getElementById("grafico-animo");

    let usuario = sessionStorage.getItem("usuario"); // 🔹 Recupera el usuario actual
    let estadoAnimo = ""; // 🔹 Estado de ánimo seleccionado

    // 📌 Validación de elementos antes de usarlos
    if (!entradaForm || !entradaText) {
        console.error("❌ Elementos del formulario no encontrados.");
        console.log("📌 entradaForm:", entradaForm);
        console.log("📌 entradaText:", entradaText);
        return;
    }   

    
    if (!graficoCanvas) {
        console.error("❌ Elemento gráfico no encontrado.");
    } else {
        const graficoAnimo = graficoCanvas.getContext("2d");
        // 📌 Aquí sigue el código normal para el gráfico
    }

    // 📌 Capturar emoji seleccionado
    moodButtons.forEach((button) => {
        button.addEventListener("click", () => {
            estadoAnimo = button.textContent;
            moodButtons.forEach((btn) => btn.classList.remove("selected"));
            button.classList.add("selected"); // 🔹 Resalta el botón seleccionado
        });
    });

    // 📌 Enviar entrada
    entradaForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const textoEntrada = entradaText.value.trim();

        if (textoEntrada === "" || estadoAnimo === "") {
            alert("❌ Debes ingresar un texto y seleccionar un estado de ánimo.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/entrada", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, estadoAnimo, textoEntrada })
            });

            const data = await response.json();
            alert(data.message);

            if (data.message.includes("✅")) {
                entradaText.value = ""; // 🔹 Limpia el campo de texto
                mostrarEntradas(); // 🔹 Refresca el historial de entradas
            }
        } catch (error) {
            console.error("❌ Error al enviar la entrada:", error);
        }
    });

    // 📌 Mostrar historial de entradas
    const mostrarEntradas = async () => {
        try {
            const response = await fetch("http://localhost:3000/entradas");
            const entradas = await response.json();

            listaEntradas.innerHTML = ""; // 🔹 Limpiar lista
            entradas.forEach(({ estadoAnimo, textoEntrada }, index) => {
                const li = document.createElement("li");
                li.classList.add("entrada-item");
                li.innerHTML = `
                    <span>${estadoAnimo} - ${textoEntrada}</span>
                    <div class="action-buttons">
                        <button class="edit-button" data-index="${index}">Editar</button>
                        <button class="delete-button" data-index="${index}">Eliminar</button>
                    </div>
                `;
                listaEntradas.appendChild(li);
            });
        } catch (error) {
            console.error("❌ Error al obtener el historial de entradas:", error);
        }
    };

    mostrarEntradas(); // 🔹 Cargar historial al inicio
});


// 📄 INDEX ESTADO DE ANIMO
document.addEventListener("DOMContentLoaded", async () => {
    // 📌 Elementos del DOM
    const calendarioPicker = document.getElementById("calendario-picker");
    const graficoCanvasAnimo = document.getElementById("grafico-animo"); // Validación
    const listaDiasDestacados = document.getElementById("lista-dias-destacados");
    const mensajeReflexion = document.getElementById("mensaje-reflexion");

    let usuario = sessionStorage.getItem("usuario"); // 🔹 Recupera el usuario actual

    if (!usuario) {
        alert("❌ No hay sesión activa. Inicia sesión primero.");
        window.location.href = "index.html";
        return;
    }

    // 📌 Obtener entradas del usuario
    const obtenerEntradasUsuario = async () => {
        const response = await fetch(`http://localhost:3000/entradas?usuario=${usuario}`);
        return await response.json();
    };

    // 🔹 Se obtiene el historial de entradas dentro de la función principal
    const entradasUsuario = await obtenerEntradasUsuario();

    console.log("📌 Entradas obtenidas:", entradasUsuario);

    // 📌 Inicializar Calendario con Emojis
    flatpickr(calendarioPicker, {
        enableTime: false,
        dateFormat: "d/m/Y",
        defaultDate: new Date(),
        onChange: (selectedDates, dateStr) => {
            const entradaDelDia = entradasUsuario.find(e => e.fecha === dateStr);
            alert(entradaDelDia ? `Estado de ánimo: ${entradaDelDia.estadoAnimo}` : "No hay entradas para este día.");
        }
    });

    // 📌 Configurar Gráfico de Evolución Emocional
    if (!graficoCanvasAnimo) {
        console.error("❌ Elemento gráfico de estado de ánimo no encontrado.");
        return;
    }

    const graficoAnimo = graficoCanvasAnimo.getContext("2d");

    const labels = entradasUsuario.map(e => e.fecha);
    const dataValores = entradasUsuario.map(e => {
        switch (e.estadoAnimo) {
            case "😊": return 4;
            case "😃": return 3;
            case "😞": return 2;
            case "😡": return 1;
            default: return 0;
        }
    });

    new Chart(graficoAnimo, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Estado de Ánimo",
                data: dataValores,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 4, ticks: { stepSize: 1 } }
            }
        }
    });

    // 📌 Mostrar Días Destacados
    listaDiasDestacados.innerHTML = "";
    entradasUsuario.slice(-5).forEach(e => {
        listaDiasDestacados.innerHTML += `<li><b>${e.fecha}:</b> ${e.estadoAnimo}</li>`;
    });

    // 📌 Reflexiones Automáticas
    const promedioEstado = dataValores.reduce((sum, val) => sum + val, 0) / dataValores.length;
    mensajeReflexion.textContent = promedioEstado >= 3
        ? "¡Tu estado de ánimo ha sido positivo! Sigue cuidando tu bienestar emocional."
        : promedioEstado <= 2
            ? "Ha habido días difíciles. Recuerda que está bien pedir apoyo si lo necesitas."
            : "Tu estado de ánimo ha sido variado. Reflexiona sobre lo que te ha hecho sentir mejor.";
});


// 📄 INDEX METAS
document.addEventListener("DOMContentLoaded", async () => {
    // 📌 Elementos del DOM
    const metaForm = document.getElementById("meta-form");
    const metaNombre = document.getElementById("meta-nombre");
    const metaCategoria = document.getElementById("meta-categoria");
    const metaPlazo = document.getElementById("meta-plazo");
    const metaDescripcion = document.getElementById("meta-descripcion");
    const listaMetas = document.getElementById("lista-metas");
    const mensajeProgreso = document.getElementById("mensaje-progreso");
    const graficoProgreso = document.getElementById("grafico-progreso").getContext("2d");

    let usuario = sessionStorage.getItem("usuario"); // 🔹 Recupera el usuario actual

    if (!usuario) {
        alert("❌ No hay sesión activa. Inicia sesión primero.");
        window.location.href = "index.html";
        return;
    }

    // 📌 Obtener metas del usuario
    const obtenerMetasUsuario = async () => {
        const response = await fetch(`http://localhost:3000/metas?usuario=${usuario}`);
        return await response.json();
    };

    const metasUsuario = await obtenerMetasUsuario();

    // 📌 Mostrar metas activas
    const mostrarMetas = () => {
        listaMetas.innerHTML = ""; // 🔹 Limpiar lista

        metasUsuario.forEach(({ nombre, categoria, plazo, descripcion }, index) => {
            const metaItem = document.createElement("div");
            metaItem.classList.add("meta-item");
            metaItem.innerHTML = `
                <h4>${nombre}</h4>
                <p><b>Categoría:</b> ${categoria}</p>
                <p><b>Fecha Límite:</b> ${plazo}</p>
                <p>${descripcion}</p>
                <div class="action-buttons">
                    <button class="edit-button" data-index="${index}">Editar</button>
                    <button class="delete-button" data-index="${index}">Eliminar</button>
                </div>
            `;
            listaMetas.appendChild(metaItem);
        });

        mensajeProgreso.textContent = metasUsuario.length
            ? "¡Tus metas activas se muestran aquí!"
            : "Aún no tienes metas registradas.";
    };

    // 📌 Registrar nueva meta
    metaForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nuevaMeta = {
            usuario,
            nombre: metaNombre.value.trim(),
            categoria: metaCategoria.value,
            plazo: metaPlazo.value,
            descripcion: metaDescripcion.value.trim()
        };

        if (!nuevaMeta.nombre || !nuevaMeta.plazo || !nuevaMeta.descripcion) {
            alert("❌ Todos los campos son obligatorios.");
            return;
        }

        const response = await fetch("http://localhost:3000/metas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaMeta)
        });

        const data = await response.json();
        alert(data.message);

        if (data.message.includes("✅")) {
            metaNombre.value = "";
            metaPlazo.value = "";
            metaDescripcion.value = "";
            metasUsuario.push(nuevaMeta); // 🔹 Añade la nueva meta localmente
            mostrarMetas(); // 🔹 Actualiza la lista de metas
        }
    });

    // 📌 Configurar gráfico de progreso
    const labels = metasUsuario.map(meta => meta.nombre);
    const progresoValores = metasUsuario.map(() => Math.floor(Math.random() * 100));

    new Chart(graficoProgreso, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Progreso (%)",
                data: progresoValores,
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 100, ticks: { stepSize: 10 } }
            }
        }
    });

    mostrarMetas(); // 🔹 Cargar metas al inicio
});


