// Server.js (Actualizado con rutas para completar y eliminar metas, y propiedad 'completada')
const express = require("express");
const fs = require("fs");
const path = require("path"); // Necesario para gestionar rutas de archivos
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
const DATA_DIR = "./data"; // Directorio donde se guardarán los JSON de datos

// --- Configuración Inicial y Funciones Globales ---

// Crear el directorio 'data' si no existe
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`Directorio '${DATA_DIR}' creado.`);
}

// Rutas de los archivos de datos
const USERS_FILE = path.join(DATA_DIR, "users.json");
const ENTRADAS_FILE = path.join(DATA_DIR, "entradas.json");
const COMENTARIOS_FILE = path.join(DATA_DIR, "comentarios.json");
const INFO_REQUESTS_FILE = path.join(DATA_DIR, "info_requests.json");
const METAS_FILE = path.join(DATA_DIR, "metas.json");
// ESTADO_ANIMO_FILE no se usará si el gráfico se basa en 'entradas'

// Funciones Únicas de lectura y escritura para todos los archivos JSON
const leerArchivo = (ruta) => {
    try {
        if (!fs.existsSync(ruta)) {
            // Si el archivo no existe, devuelve un array vacío en lugar de lanzar un error
            return [];
        }
        const data = fs.readFileSync(ruta, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error al leer el archivo ${ruta}:`, error);
        // Si hay un error de parseo (JSON inválido), también devuelve un array vacío
        return [];
    }
};

const guardarArchivo = (ruta, datos) => {
    try {
        fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf8");
    } catch (error) {
        console.error(`Error al escribir en el archivo ${ruta}:`, error);
    }
};

// --- Rutas de la API ---

// Ruta para el registro de usuarios
app.post("/register", (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "❌ Por favor, completa todos los campos para el registro." });
        }

        const users = leerArchivo(USERS_FILE);

        // Verificar si el usuario o el email ya existen
        const userExists = users.some(user => user.username === username);
        const emailExists = users.some(user => user.email === email);

        if (userExists) {
            return res.status(409).json({ message: "❌ El nombre de usuario ya está en uso." });
        }
        if (emailExists) {
            return res.status(409).json({ message: "❌ El correo electrónico ya está registrado." });
        }

        users.push({ id: Date.now(), username, email, password }); // En un proyecto real, se debería hashear la contraseña
        guardarArchivo(USERS_FILE, users);

        res.status(201).json({ message: "✅ Usuario registrado con éxito." });
    } catch (error) {
        console.error("❌ Error en /register:", error);
        res.status(500).json({ message: "❌ Error interno del servidor al registrar usuario." });
    }
});

// Ruta para el inicio de sesión
app.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "❌ Por favor, ingresa tu correo/usuario y contraseña." });
        }

        const users = leerArchivo(USERS_FILE);
        // En un proyecto real, compararíamos contraseñas hasheadas
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // En un proyecto real, aquí generarías un token de sesión (JWT)
            res.json({ message: "✅ Inicio de sesión exitoso.", user: { id: user.id, username: user.username } });
        } else {
            res.status(401).json({ message: "❌ Nombre de usuario o contraseña incorrectos." });
        }
    } catch (error) {
        console.error("❌ Error en /login:", error);
        res.status(500).json({ message: "❌ Error interno del servidor al iniciar sesión." });
    }
});

// Rutas para Entradas Diarias
app.post("/entradas", (req, res) => {
    try {
        const { titulo, texto, estadoAnimo, fecha } = req.body;
        if (!titulo || !texto || !estadoAnimo || !fecha) {
            return res.status(400).json({ message: "❌ Faltan campos obligatorios para la entrada." });
        }

        const entradas = leerArchivo(ENTRADAS_FILE);
        entradas.push({ _id: Date.now().toString(), titulo, texto, estadoAnimo, fecha }); // Usamos _id para consistencia con MongoDB
        guardarArchivo(ENTRADAS_FILE, entradas);

        res.status(201).json({ message: "✅ Entrada guardada con éxito." });
    } catch (error) {
        console.error("❌ Error en /entradas (POST):", error);
        res.status(500).json({ message: "❌ Error interno del servidor al guardar la entrada." });
    }
});

app.get("/entradas", (req, res) => {
    try {
        const entradas = leerArchivo(ENTRADAS_FILE);
        res.json(entradas);
    } catch (error) {
        console.error("❌ Error en /entradas (GET):", error);
        res.status(500).json({ message: "❌ Error interno del servidor al obtener las entradas." });
    }
});

// Eliminar entrada
app.delete("/entradas/:id", (req, res) => {
    try {
        const { id } = req.params;
        let entradasData = leerArchivo(ENTRADAS_FILE);
        const initialLength = entradasData.length;
        entradasData = entradasData.filter(entrada => entrada._id !== id);

        if (entradasData.length === initialLength) {
            return res.status(404).json({ message: "❌ Entrada no encontrada para eliminar." });
        }

        guardarArchivo(ENTRADAS_FILE, entradasData);
        res.json({ message: "✅ Entrada eliminada exitosamente." });
    } catch (error) {
        console.error("❌ Error en /entradas/:id (DELETE):", error);
        res.status(500).json({ message: "❌ Error interno del servidor al eliminar la entrada." });
    }
});

// Rutas para Comentarios (ACTUALIZADO para nombre y correo)
app.post("/comentarios", (req, res) => {
    try {
        const { nombre, correo, tipo, comentario } = req.body; // Añadidos nombre y correo
        if (!nombre || !correo || !tipo || !comentario) { // Validación actualizada
            return res.status(400).json({ message: "❌ Faltan campos obligatorios para el comentario (nombre, correo, tipo, comentario)." });
        }

        const comentariosData = leerArchivo(COMENTARIOS_FILE);
        // Guarda todos los campos
        comentariosData.push({ nombre, correo, tipo, comentario, timestamp: new Date().toISOString() });
        guardarArchivo(COMENTARIOS_FILE, comentariosData);

        res.status(201).json({ message: "✅ Comentario enviado con éxito. ¡Gracias por tu opinión!" });
    } catch (error) {
        console.error("❌ Error en /comentarios:", error);
        res.status(500).json({ message: "❌ Error interno del servidor al guardar el comentario." });
    }
});

// Ruta para guardar solicitudes de información
app.post("/info-requests", (req, res) => {
    try {
        const { nombre, correo, mensaje } = req.body; // El mensaje ahora incluirá la info adicional desde el frontend
        if (!nombre || !correo || !mensaje) {
            return res.status(400).json({ message: "❌ Faltan campos obligatorios para la solicitud de información." });
        }

        const requestsData = leerArchivo(INFO_REQUESTS_FILE);
        requestsData.push({ nombre, correo, mensaje, timestamp: new Date().toISOString() });
        guardarArchivo(INFO_REQUESTS_FILE, requestsData);

        res.json({ message: "✅ Solicitud de información enviada con éxito. Te contactaremos pronto." });
    } catch (error) {
        console.error("❌ Error en /info-requests:", error);
        res.status(500).json({ message: "❌ Error interno del servidor al procesar la solicitud de información." });
    }
});

// Rutas para Gestión de Metas
app.post("/metas", (req, res) => {
    try {
        const { nombre, categoria, plazo, descripcion } = req.body;
        if (!nombre || !categoria || !plazo || !descripcion) {
            return res.status(400).json({ message: "❌ Faltan campos obligatorios para la meta." });
        }

        const metas = leerArchivo(METAS_FILE);
        metas.push({ _id: Date.now().toString(), nombre, categoria, plazo, descripcion, completada: false, fechaCreacion: new Date().toISOString().split('T')[0] });
        guardarArchivo(METAS_FILE, metas);

        res.status(201).json({ message: "✅ Meta registrada con éxito." });
    } catch (error) {
        console.error("❌ Error en /metas (POST):", error);
        res.status(500).json({ message: "❌ Error interno del servidor al registrar la meta." });
    }
});

app.get("/metas", (req, res) => {
    try {
        const metas = leerArchivo(METAS_FILE);
        res.json(metas);
    } catch (error) {
        console.error("❌ Error en /metas (GET):", error);
        res.status(500).json({ message: "❌ Error interno del servidor al obtener las metas." });
    }
});

// Marcar meta como completada
app.patch("/metas/:id/completar", (req, res) => {
    try {
        const { id } = req.params;
        let metasData = leerArchivo(METAS_FILE);
        const metaIndex = metasData.findIndex(meta => meta._id === id);

        if (metaIndex === -1) {
            return res.status(404).json({ message: "❌ Meta no encontrada." });
        }

        metasData[metaIndex].completada = true;
        guardarArchivo(METAS_FILE, metasData);

        res.json({ message: "✅ Meta marcada como completada." });
    } catch (error) {
        console.error("❌ Error en /metas/:id/completar:", error);
        res.status(500).json({ message: "❌ Error interno del servidor al completar meta." });
    }
});

// Eliminar meta
app.delete("/metas/:id", (req, res) => {
    try {
        const { id } = req.params;
        let metasData = leerArchivo(METAS_FILE);
        const initialLength = metasData.length;
        metasData = metasData.filter(meta => meta._id !== id);

        if (metasData.length === initialLength) {
            return res.status(404).json({ message: "❌ Meta no encontrada para eliminar." });
        }

        guardarArchivo(METAS_FILE, metasData);
        res.json({ message: "✅ Meta eliminada exitosamente." });
    } catch (error) {
        console.error("❌ Error en /metas/:id (DELETE):", error);
        res.status(500).json({ message: "❌ Error interno del servidor al eliminar meta." });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Mood Journal en ejecución en http://localhost:${PORT}`);
});