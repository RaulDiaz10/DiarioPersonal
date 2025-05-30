document.addEventListener("DOMContentLoaded", () => {
    // === Funciones Genéricas para Abrir y Cerrar Popups ===
    function openPopup(popupElement) {
        if (popupElement) {
            popupElement.classList.add("popup-active");
            document.body.classList.add("popup-active"); // Para el overlay de fondo
        } else {
            console.warn("Intentando abrir un popup que no existe en el DOM.");
        }
    }

    function closePopup(popupElement) {
        if (popupElement) {
            popupElement.classList.remove("popup-active");
            document.body.classList.remove("popup-active"); // Quitar el overlay
        } else {
            console.warn("Intentando cerrar un popup que no existe en el DOM.");
        }
    }

    // === Elementos del DOM para Popups de Login/Registro ===
    const iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
    const registroBtn = document.getElementById("registroBtn");
    const loginPopup = document.getElementById("loginPopup");
    const registroPopup = document.getElementById("registroPopup");
    const closeLoginPopup = document.getElementById("closeLoginPopup");
    const closeRegistroPopup = document.getElementById("closeRegistroPopup");

    // Campos de login
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginSubmitBtn = document.getElementById("loginBtn"); // Botón dentro del popup de login

    // Campos de registro
    const newUsernameInput = document.getElementById("newUsername");
    const newEmailInput = document.getElementById("newEmail");
    const newPasswordInput = document.getElementById("newPassword");
    const registrarSubmitBtn = document.getElementById("registrarBtn"); // Botón dentro del popup de registro


    // === Elementos del DOM para el Menú de Ayuda ===
    const configBtn = document.getElementById("config-btn");
    const helpOptions = document.getElementById("help-options-menu");
    const closeHelpMenu = document.getElementById("closeHelpMenu");

    // === Elementos del DOM para Popups de Comentarios e Información de Contacto ===
    const comentarioBtn = document.getElementById("comentarioBtn"); // ID CORREGIDO
    const comentarioPopup = document.getElementById("comentarioPopup");
    const closeComentarioPopup = document.getElementById("closeComentarioPopup");
    const nombreComentario = document.getElementById("nombreComentario"); // Añadido
    const correoComentario = document.getElementById("correoComentario"); // Añadido
    const tipoComentario = document.getElementById("tipoComentario");
    const comentarioTexto = document.getElementById("comentarioTexto");
    const enviarComentarioBtn = document.getElementById("enviarComentario");

    const infoGeneralBtn = document.getElementById("infoGeneralBtn");
    const infoContactoPopup = document.getElementById("infoContactoPopup");
    const closeInfoContactoPopup = document.getElementById("closeInfoContactoPopup");
    const nombreInfoContacto = document.getElementById("nombreInfoContacto");
    const correoInfoContacto = document.getElementById("correoInfoContacto");
    const mensajeInfoContacto = document.getElementById("mensajeInfoContacto");
    const enviarInfoContactoBtn = document.getElementById("enviarInfoContacto");

    const agradecimientoPopup = document.getElementById("agradecimientoPopup");
    const closeAgradecimientoPopup = document.getElementById("closeAgradecimientoPopup");


    // --- Lógica de Manejo de Eventos ---

    // Manejo de ventanas emergentes (Login/Registro)
    if (iniciarSesionBtn && loginPopup && closeLoginPopup) {
        iniciarSesionBtn.addEventListener("click", () => {
            openPopup(loginPopup);
        });

        closeLoginPopup.addEventListener("click", () => {
            closePopup(loginPopup);
        });
    }

    if (registroBtn && registroPopup && closeRegistroPopup) {
        registroBtn.addEventListener("click", () => {
            openPopup(registroPopup);
        });

        closeRegistroPopup.addEventListener("click", () => {
            closePopup(registroPopup);
        });
    }

    // === Lógica para el SUBMIT del formulario de Login ===
    if (loginSubmitBtn && usernameInput && passwordInput && loginPopup) {
        loginSubmitBtn.addEventListener("click", async () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                alert("Por favor, ingresa tu correo/usuario y contraseña.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                alert(data.message);

                if (response.ok) {
                    closePopup(loginPopup);
                    window.location.href = "indexEntradas.html";
                }
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                alert("No se pudo conectar con el servidor para iniciar sesión.");
            }
        });
    }

    // === Lógica para el SUBMIT del formulario de Registro ===
    if (registrarSubmitBtn && newUsernameInput && newEmailInput && newPasswordInput && registroPopup) {
        registrarSubmitBtn.addEventListener("click", async () => {
            const newUsername = newUsernameInput.value.trim();
            const newEmail = newEmailInput.value.trim();
            const newPassword = newPasswordInput.value.trim();

            if (!newUsername || !newEmail || !newPassword) {
                alert("Por favor, completa todos los campos para el registro.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword })
                });

                const data = await response.json();
                alert(data.message);

                if (response.ok) {
                    closePopup(registroPopup);
                    window.location.href = "indexEntradas.html";
                }
            } catch (error) {
                console.error("Error al registrar usuario:", error);
                alert("No se pudo conectar con el servidor para registrar el usuario.");
            }
        });
    }

    // ====================================================================================================
    // Lógica del Menú de Ayuda y Popups de Contacto
    // ====================================================================================================

    // Manejo del menú de ayuda principal (⚙️)
    if (configBtn && helpOptions && closeHelpMenu) {
        configBtn.addEventListener("click", () => {
            helpOptions.classList.toggle("active");
        });

        closeHelpMenu.addEventListener("click", () => {
            helpOptions.classList.remove("active");
        });
    } else {
        console.warn("Elementos del menú de ayuda (config-btn, help-options-menu, closeHelpMenu) no encontrados. Revisa tu index.html.");
    }


    // Manejo de comentarios
    if (comentarioBtn && comentarioPopup && closeComentarioPopup && nombreComentario && correoComentario && tipoComentario && comentarioTexto && enviarComentarioBtn) {
        comentarioBtn.addEventListener("click", () => {
            openPopup(comentarioPopup);
            // Limpiar y ocultar campos al abrir para un estado inicial limpio
            tipoComentario.value = "";
            comentarioTexto.value = "";
            nombreComentario.value = "";
            correoComentario.value = "";
            comentarioTexto.style.display = "none";
            enviarComentarioBtn.style.display = "none";
        });

        closeComentarioPopup.addEventListener("click", () => {
            closePopup(comentarioPopup);
            // Asegurarse de ocultar los campos si el popup se cierra antes de enviar
            tipoComentario.value = ""; // Resetear selección
            comentarioTexto.value = ""; // Limpiar texto
            nombreComentario.value = ""; // Limpiar al cerrar
            correoComentario.value = ""; // Limpiar al cerrar
            comentarioTexto.style.display = "none"; // Ocultar campos
            enviarComentarioBtn.style.display = "none";
        });

        // Event listener para mostrar/ocultar campos al cambiar la selección
        tipoComentario.addEventListener("change", () => {
            if (tipoComentario.value !== "") {
                comentarioTexto.style.display = "block";
                enviarComentarioBtn.style.display = "block";
                comentarioTexto.focus(); // Poner foco en el textarea
            } else {
                comentarioTexto.style.display = "none";
                enviarComentarioBtn.style.display = "none";
            }
        });

        enviarComentarioBtn.addEventListener("click", async () => {
            const nombre = nombreComentario.value.trim(); // Añadido
            const correo = correoComentario.value.trim(); // Añadido
            const tipo = tipoComentario.value;
            const comentario = comentarioTexto.value.trim();

            // Modificada la validación para incluir nombre y correo
            if (!nombre || !correo || !tipo || !comentario) {
                alert("Por favor, completa todos los campos (nombre, correo, tipo y comentario).");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/comentarios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // Envía todos los campos necesarios
                    body: JSON.stringify({ nombre, correo, tipo, comentario })
                });

                const data = await response.json();
                alert(data.message);
                if (response.ok) {
                    closePopup(comentarioPopup);
                    openPopup(agradecimientoPopup);
                    // Limpiar campos después de enviar
                    tipoComentario.value = "";
                    comentarioTexto.value = "";
                    nombreComentario.value = "";
                    correoComentario.value = "";
                    comentarioTexto.style.display = "none";
                    enviarComentarioBtn.style.display = "none";
                }
            } catch (error) {
                console.error("Error al enviar comentario:", error);
                alert("No se pudo conectar con el servidor para enviar el comentario.");
            }
        });
    } else {
        console.warn("Elementos del popup de comentarios (comentarioBtn, comentarioPopup, nombreComentario, correoComentario, etc.) no encontrados. Revisa tu index.html.");
    }


    // Manejo de información de contacto
    if (infoGeneralBtn && infoContactoPopup && closeInfoContactoPopup && nombreInfoContacto && correoInfoContacto && mensajeInfoContacto && enviarInfoContactoBtn) {
        infoGeneralBtn.addEventListener("click", () => {
            openPopup(infoContactoPopup);
            if (helpOptions) {
                helpOptions.classList.remove("active"); // Cerrar menú de ayuda si está abierto
            }
        });

        closeInfoContactoPopup.addEventListener("click", () => {
            closePopup(infoContactoPopup);
            // Limpiar campos al cerrar el popup
            nombreInfoContacto.value = "";
            correoInfoContacto.value = "";
            mensajeInfoContacto.value = "";
        });

        enviarInfoContactoBtn.addEventListener("click", async () => {
            const nombre = nombreInfoContacto.value.trim();
            const correo = correoInfoContacto.value.trim();
            const mensaje = mensajeInfoContacto.value.trim();

            if (!nombre || !correo || !mensaje) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Información de contacto para añadir al mensaje
            const infoAdicional = `\n\n--- Información de Contacto Adicional ---\nTeléfono: +52 331 234 5678\nHorario: Lunes a Viernes, 9 AM - 5 PM (GMT-6)\nDirección: Av. Siempre Viva #123, Springfield`;
            const mensajeCompleto = mensaje + infoAdicional;

            try {
                const response = await fetch("http://localhost:3000/info-requests", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, correo, mensaje: mensajeCompleto })
                });

                const data = await response.json();
                alert(data.message);
                if (response.ok) {
                    closePopup(infoContactoPopup);
                    openPopup(agradecimientoPopup);
                    nombreInfoContacto.value = "";
                    correoInfoContacto.value = "";
                    mensajeInfoContacto.value = "";
                }
            } catch (error) {
                console.error("Error al enviar solicitud de información:", error);
                alert("No se pudo conectar con el servidor para enviar la solicitud.");
            }
        });
    } else {
        console.warn("Elementos del popup de información de contacto (infoGeneralBtn, infoContactoPopup, etc.) no encontrados. Revisa tu index.html.");
    }

    // Manejo del popup de agradecimiento
    if (agradecimientoPopup && closeAgradecimientoPopup) {
        closeAgradecimientoPopup.addEventListener("click", () => {
            closePopup(agradecimientoPopup);
        });
    } else {
        console.warn("Elementos del popup de agradecimiento (agradecimientoPopup, closeAgradecimientoPopup) no encontrados. Revisa tu index.html.");
    }

    // ====================================================================================================
    // Lógica Específica para indexEntradas.html (Mantener al final, ya que solo se ejecuta en esa página)
    // ====================================================================================================
    const esPaginaEntradas = document.body.classList.contains("pagina-entradas");
    const entradaForm = document.getElementById("entradaForm");
    const entradaTitulo = document.getElementById("entradaTitulo");
    const entradaTexto = document.getElementById("entradaTexto");
    const estadoAnimoSelect = document.getElementById("estadoAnimo");
    const guardarEntradaBtn = document.getElementById("guardarEntrada");
    const listaEntradas = document.getElementById("listaEntradas");
    const mensajeSinEntradas = document.getElementById("mensajeSinEntradas");
    const chartContainer = document.getElementById("moodChartContainer");
    const moodChartCanvas = document.getElementById("moodChart");
    let moodChartInstance;

    if (esPaginaEntradas) {
        console.log("Cargando lógica específica para indexEntradas.html");
        if (entradaForm && guardarEntradaBtn && listaEntradas && mensajeSinEntradas) {
            guardarEntradaBtn.addEventListener("click", async (event) => {
                event.preventDefault();

                const titulo = entradaTitulo.value.trim();
                const texto = entradaTexto.value.trim();
                const estadoAnimo = estadoAnimoSelect.value;
                const fecha = new Date().toISOString().split('T')[0];

                if (!titulo || !texto || !estadoAnimo) {
                    alert("Por favor, completa todos los campos de la entrada y selecciona un estado de ánimo.");
                    return;
                }

                const nuevaEntrada = { titulo, texto, estadoAnimo, fecha };

                try {
                    const response = await fetch("http://localhost:3000/entradas", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(nuevaEntrada)
                    });

                    const data = await response.json();
                    alert(data.message);

                    if (response.ok) {
                        entradaTitulo.value = "";
                        entradaTexto.value = "";
                        estadoAnimoSelect.value = "";
                        cargarEntradas();
                    }
                } catch (error) {
                    console.error("Error al guardar entrada:", error);
                    alert("No se pudo conectar con el servidor para guardar la entrada.");
                }
            });
        }

        async function cargarEntradas() {
            try {
                const response = await fetch("http://localhost:3000/entradas");
                const entradas = await response.json();

                listaEntradas.innerHTML = "";
                if (entradas.length === 0) {
                    mensajeSinEntradas.style.display = "block";
                } else {
                    mensajeSinEntradas.style.display = "none";
                    entradas.forEach(entrada => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                            <h3>${entrada.titulo}</h3>
                            <p>${entrada.texto}</p>
                            <p><strong>Estado de Ánimo:</strong> ${entrada.estadoAnimo} (registrado el ${entrada.fecha})</p>
                            <button class="editar-entrada" data-id="${entrada._id}">Editar</button>
                            <button class="eliminar-entrada" data-id="${entrada._id}">Eliminar</button>
                        `;
                        listaEntradas.appendChild(li);
                    });

                    document.querySelectorAll(".eliminar-entrada").forEach(button => {
                        button.addEventListener("click", async (event) => {
                            const id = event.target.dataset.id;
                            if (confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
                                try {
                                    const response = await fetch(`http://localhost:3000/entradas/${id}`, {
                                        method: "DELETE"
                                    });
                                    const data = await response.json();
                                    alert(data.message);
                                    if (response.ok) {
                                        cargarEntradas();
                                    }
                                } catch (error) {
                                    console.error("Error al eliminar entrada:", error);
                                    alert("No se pudo conectar con el servidor para eliminar la entrada.");
                                }
                            }
                        });
                    });
                }
                actualizarGraficoAnimo(entradas);
            } catch (error) {
                console.error("Error al cargar entradas:", error);
            }
        }

        function actualizarGraficoAnimo(entradas) {
            if (!moodChartCanvas) return;

            const moodCounts = {};
            const moodOrder = ["Muy Mal", "Mal", "Neutral", "Bien", "Muy Bien"];
            const moodColors = {
                "Muy Mal": "#e74c3c", // Rojo
                "Mal": "#f39c12",    // Naranja
                "Neutral": "#f1c40f", // Amarillo
                "Bien": "#2ecc71",   // Verde
                "Muy Bien": "#3498db" // Azul
            };

            moodOrder.forEach(mood => moodCounts[mood] = 0);

            entradas.forEach(entrada => {
                if (moodCounts.hasOwnProperty(entrada.estadoAnimo)) {
                    moodCounts[entrada.estadoAnimo]++;
                }
            });

            const labels = moodOrder;
            const data = moodOrder.map(mood => moodCounts[mood]);
            const backgroundColors = moodOrder.map(mood => moodColors[mood]);

            if (moodChartInstance) {
                moodChartInstance.destroy();
            }

            moodChartInstance = new Chart(moodChartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Frecuencia de Estado de Ánimo',
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: backgroundColors.map(color => color.replace(')', ', 1)')),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Evolución del Estado de Ánimo a lo largo del tiempo'
                        }
                    }
                }
            });
        }

        cargarEntradas();
    }

    // ====================================================================================================
    // Lógica Específica para metas.html (Mantener al final, ya que solo se ejecuta en esa página)
    // ====================================================================================================
    const esPaginaMetas = document.body.classList.contains("pagina-metas");
    const metaForm = document.getElementById("metaForm");
    const metaNombre = document.getElementById("metaNombre");
    const metaCategoria = document.getElementById("metaCategoria");
    const metaPlazo = document.getElementById("metaPlazo");
    const metaDescripcion = document.getElementById("metaDescripcion");
    const guardarMetaBtn = document.getElementById("guardarMeta");
    const listaMetas = document.getElementById("listaMetas");
    const mensajeSinMetas = document.getElementById("mensajeSinMetas");
    const metasChartCanvas = document.getElementById("metasChart");
    let metasChartInstance;

    if (esPaginaMetas) {
        console.log("Cargando lógica específica para metas.html");
        async function cargarMetasYGrafico() {
            try {
                const response = await fetch("http://localhost:3000/metas");
                const metas = await response.json();

                listaMetas.innerHTML = "";
                if (metas.length === 0) {
                    mensajeSinMetas.style.display = "block";
                } else {
                    mensajeSinMetas.style.display = "none";
                    metas.forEach(meta => {
                        const li = document.createElement("li");
                        li.className = meta.completada ? "meta-completada" : "";
                        li.innerHTML = `
                            <h3>${meta.nombre}</h3>
                            <p><strong>Categoría:</strong> ${meta.categoria}</p>
                            <p><strong>Plazo:</strong> ${meta.plazo}</p>
                            <p>${meta.descripcion}</p>
                            <p><strong>Estado:</strong> ${meta.completada ? "Completada ✅" : "Pendiente ⏳"}</p>
                            ${!meta.completada ? `<button class="marcar-completada" data-id="${meta._id}">Marcar como Completada</button>` : ''}
                            <button class="eliminar-meta" data-id="${meta._id}">Eliminar</button>
                        `;
                        listaMetas.appendChild(li);
                    });

                    document.querySelectorAll(".marcar-completada").forEach(button => {
                        button.addEventListener("click", async (event) => {
                            const id = event.target.dataset.id;
                            if (confirm("¿Estás seguro de que quieres marcar esta meta como completada?")) {
                                try {
                                    const response = await fetch(`http://localhost:3000/metas/${id}/completar`, {
                                        method: "PATCH"
                                    });
                                    const data = await response.json();
                                    alert(data.message);
                                    if (response.ok) {
                                        cargarMetasYGrafico();
                                    }
                                } catch (error) {
                                    console.error("Error al marcar meta como completada:", error);
                                    alert("No se pudo conectar con el servidor para completar la meta.");
                                }
                            }
                        });
                    });

                    document.querySelectorAll(".eliminar-meta").forEach(button => {
                        button.addEventListener("click", async (event) => {
                            const id = event.target.dataset.id;
                            if (confirm("¿Estás seguro de que quieres eliminar esta meta?")) {
                                try {
                                    const response = await fetch(`http://localhost:3000/metas/${id}`, {
                                        method: "DELETE"
                                    });
                                    const data = await response.json();
                                    alert(data.message);
                                    if (response.ok) {
                                        cargarMetasYGrafico();
                                    }
                                } catch (error) {
                                    console.error("Error al eliminar meta:", error);
                                    alert("No se pudo conectar con el servidor para eliminar la meta.");
                                }
                            }
                        });
                    });
                }
                actualizarGraficoMetas(metas);
            } catch (error) {
                console.error("Error al cargar metas:", error);
            }
        }

        function actualizarGraficoMetas(metas) {
            if (!metasChartCanvas) return;

            const totalMetas = metas.length;
            const metasCompletadas = metas.filter(meta => meta.completada).length;
            const metasPendientes = totalMetas - metasCompletadas;

            const labels = ["Completadas", "Pendientes"];
            const data = [metasCompletadas, metasPendientes];
            const backgroundColors = ["#2ecc71", "#e74c3c"];

            if (metasChartInstance) {
                metasChartInstance.destroy();
            }

            metasChartInstance = new Chart(metasChartCanvas, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Progreso General de Metas'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed;
                                    const percentage = totalMetas > 0 ? ((value / totalMetas) * 100).toFixed(2) : 0;
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }

        if (metaForm && guardarMetaBtn) {
            guardarMetaBtn.addEventListener("click", async (event) => {
                event.preventDefault();

                const nuevaMeta = {
                    nombre: metaNombre.value.trim(),
                    categoria: metaCategoria.value,
                    plazo: metaPlazo.value,
                    descripcion: metaDescripcion.value.trim()
                };

                if (!nuevaMeta.nombre || !nuevaMeta.plazo || !nuevaMeta.descripcion) {
                    alert("❌ Todos los campos son obligatorios.");
                    return;
                }

                try {
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
                        cargarMetasYGrafico();
                    }
                } catch (error) {
                    console.error("❌ Error al registrar la meta:", error);
                    alert("❌ No se pudo conectar con el servidor para registrar la meta.");
                }
            });
        }

        cargarMetasYGrafico();
    }
});