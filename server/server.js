const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

// Crear aplicación Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Sirve los archivos estáticos desde la carpeta /public
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para la página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Ruta para la página lobby (lobby.html)
app.get('/lobby', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/lobby.html'));
});

// Lista para almacenar los usuarios creados
let usuarios = [];

// Conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Enviar la lista de usuarios actuales al nuevo cliente
    socket.emit('actualizarUsuarios', usuarios);

    // Escuchar el evento 'crearUsuario'
    socket.on('crearUsuario', (data) => {
        const { username } = data;

        // Validación simple: verifica si se ingresó un nombre de usuario
        if (!username) {
            socket.emit('usuarioCreado', 'El nombre de usuario es requerido.');
            return;
        }

        // Agregar el usuario a la lista
        usuarios.push(username);

        // Enviar una respuesta al cliente
        socket.emit('usuarioCreado', `Usuario ${username} creado con éxito.`);

        // Emitir la lista actualizada a todos los clientes
        io.emit('actualizarUsuarios', usuarios);

        // Redirigir al cliente a la página lobby
        socket.emit('redirect', '/lobby');
    });
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
