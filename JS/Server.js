const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const ENTRADAS_FILE = "./data/entradas.json";
const ESTADO_ANIMO_FILE = "./data/estado_animo.json";
const METAS_FILE = "./data/metas.json";
const PORT = 3000;
const USERS_FILE = "./data/users.json"; // 🔹 Archivo donde se almacenarán los usuarios

// 📌 Leer el archivo de usuarios
const leerUsuarios = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
};

// 📌 Guardar usuarios en el archivo
const guardarUsuarios = (usuarios) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2), "utf-8");
    } catch (error) {
        console.error("Error al guardar usuarios:", error);
    }
};

// 📌 Registro de usuario
app.post("/registro", (req, res) => {
    const { username, email, password } = req.body;
    let usuarios = leerUsuarios();

    if (usuarios.some(user => user.email === email)) {
        return res.json({ message: "❌ Este correo ya está registrado." });
    }

    const nuevoUsuario = { username, email, password };
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    res.json({ message: "✅ Registro exitoso.", usuario: email });
});

// 📌 Inicio de sesión
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const usuarios = leerUsuarios();

    const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

    if (!usuarioEncontrado) {
        return res.json({ message: "❌ Usuario o contraseña incorrectos." });
    }

    res.json({ message: "✅ Inicio de sesión exitoso.", usuario: email });
});

// 📌 Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


// 📄 MENU DE AYUDA
const COMMENTS_FILE = "./data/comentarios.json"; // 🔹 Archivo donde se almacenan los comentarios
const INFO_REQUESTS_FILE = "./data/info_requests.json"; // 🔹 Archivo para las solicitudes de información

// 📌 Funciones de lectura y escritura
const leerArchivo = (ruta) => {
    if (!fs.existsSync(ruta)) return [];
    return JSON.parse(fs.readFileSync(ruta, "utf-8"));
};

const guardarArchivo = (ruta, datos) => {
    try {
        fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");
    } catch (error) {
        console.error(`❌ Error al escribir en ${ruta}:`, error);
    }
};

// 📌 Guardar comentario
app.post("/comentario", (req, res) => {
    try {
        const { nombre, correo, motivo, mensaje } = req.body;

        if (!nombre || !correo || !mensaje) {
            return res.status(400).json({ message: "❌ Todos los campos son obligatorios." });
        }

        console.log("📌 Datos recibidos:", req.body); // 🔹 Verifica qué datos llegan al servidor

        let comentarios = leerArchivo("./data/comentarios.json");

        const nuevoComentario = { nombre, correo, motivo, mensaje, fecha: new Date().toISOString() };
        comentarios.push(nuevoComentario);
        guardarArchivo("./data/comentarios.json", comentarios);

        res.json({ message: "✅ Comentario enviado correctamente." });
    } catch (error) {
        console.error("❌ Error en /comentario:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});

// 📌 Guardar solicitud de información
app.post("/info", (req, res) => {
    try {
        const { nombre, correo, mensaje } = req.body;
        let solicitudes = leerArchivo(INFO_REQUESTS_FILE);

        const nuevaSolicitud = { nombre, correo, mensaje, fecha: new Date().toISOString() };
        solicitudes.push(nuevaSolicitud);
        guardarArchivo(INFO_REQUESTS_FILE, solicitudes);

        res.json({ message: "✅ Solicitud de información enviada correctamente." });
    } catch (error) {
        console.error("❌ Error en /info:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});



// 📄 INDEX ENTRADAS
// 📌 Funciones de lectura y escritura (renombradas)
const leerArchivo1 = (ruta) => {
    if (!fs.existsSync(ruta)) return [];
    return JSON.parse(fs.readFileSync(ruta, "utf-8"));
};

const guardarArchivo1 = (ruta, datos) => {
    try {
        fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");
    } catch (error) {
        console.error(`❌ Error al escribir en ${ruta}:`, error);
    }
};

// 📌 Guardar nueva entrada
app.post("/entrada", (req, res) => {
    try {
        const { usuario, estadoAnimo, textoEntrada } = req.body;

        if (!usuario || !estadoAnimo || !textoEntrada) {
            return res.status(400).json({ message: "❌ Todos los campos son obligatorios." });
        }

        let entradas = leerArchivo1(ENTRADAS_FILE);

        const nuevaEntrada = { usuario, estadoAnimo, textoEntrada, fecha: new Date().toISOString() };
        entradas.push(nuevaEntrada);
        guardarArchivo1(ENTRADAS_FILE, entradas);

        res.json({ message: "✅ Entrada guardada exitosamente." });
    } catch (error) {
        console.error("❌ Error en /entrada:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});

// 📌 Obtener historial de entradas
app.get("/entradas", (req, res) => {
    try {
        const entradas = leerArchivo1(ENTRADAS_FILE);
        res.json(entradas);
    } catch (error) {
        console.error("❌ Error en /entradas:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});

// 📌 Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


// 📄 INDEX ESTADO DE ANIMO
// 📌 Funciones de lectura y escritura (renombradas para evitar conflictos)
const leerArchivo2 = (ruta) => {
    if (!fs.existsSync(ruta)) return [];
    return JSON.parse(fs.readFileSync(ruta, "utf-8"));
};

const guardarArchivo2 = (ruta, datos) => {
    try {
        fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");
    } catch (error) {
        console.error(`❌ Error al escribir en ${ruta}:`, error);
    }
};

// 📌 Guardar estado de ánimo
app.post("/estado-animo", (req, res) => {
    try {
        const { usuario, estadoAnimo, fecha } = req.body;

        if (!usuario || !estadoAnimo || !fecha) {
            return res.status(400).json({ message: "❌ Todos los campos son obligatorios." });
        }

        let estadoAnimoData = leerArchivo2(ESTADO_ANIMO_FILE);
        estadoAnimoData.push({ usuario, estadoAnimo, fecha });

        guardarArchivo2(ESTADO_ANIMO_FILE, estadoAnimoData);

        res.json({ message: "✅ Estado de ánimo registrado exitosamente." });
    } catch (error) {
        console.error("❌ Error en /estado-animo:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});

// 📌 Obtener estados de ánimo por usuario
app.get("/estado-animo", (req, res) => {
    try {
        const { usuario } = req.query;

        if (!usuario) {
            return res.status(400).json({ message: "❌ Se requiere usuario para obtener datos." });
        }

        const estadoAnimoData = leerArchivo2(ESTADO_ANIMO_FILE);
        const datosUsuario = estadoAnimoData.filter(entry => entry.usuario === usuario);

        res.json(datosUsuario);
    } catch (error) {
        console.error("❌ Error en /estado-animo:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});


// 📄 INDEX METAS
// 📌 Funciones de lectura y escritura (renombradas para evitar conflictos)
const leerArchivo3 = (ruta) => {
    if (!fs.existsSync(ruta)) return [];
    return JSON.parse(fs.readFileSync(ruta, "utf-8"));
};

const guardarArchivo3 = (ruta, datos) => {
    try {
        fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");
    } catch (error) {
        console.error(`❌ Error al escribir en ${ruta}:`, error);
    }
};

// 📌 Guardar nueva meta
app.post("/metas", (req, res) => {
    try {
        const { usuario, nombre, categoria, plazo, descripcion } = req.body;

        if (!usuario || !nombre || !plazo || !descripcion) {
            return res.status(400).json({ message: "❌ Todos los campos son obligatorios." });
        }

        let metasData = leerArchivo3(METAS_FILE);
        metasData.push({ usuario, nombre, categoria, plazo, descripcion });

        guardarArchivo3(METAS_FILE, metasData);

        res.json({ message: "✅ Meta registrada exitosamente." });
    } catch (error) {
        console.error("❌ Error en /metas:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});

// 📌 Obtener metas por usuario
app.get("/metas", (req, res) => {
    try {
        const { usuario } = req.query;

        if (!usuario) {
            return res.status(400).json({ message: "❌ Se requiere usuario para obtener metas." });
        }

        const metasData = leerArchivo3(METAS_FILE);
        const metasUsuario = metasData.filter(meta => meta.usuario === usuario);

        res.json(metasUsuario);
    } catch (error) {
        console.error("❌ Error en /metas:", error);
        res.status(500).json({ message: "❌ Error interno del servidor." });
    }
});
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));