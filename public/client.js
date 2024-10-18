// Conectar con el servidor usando Socket.IO
const socket = io();

// Referencias a los elementos del DOM
const submitBtn = document.getElementById('submitBtn');
const responseText = document.getElementById('response');

// Evento para manejar el clic en el botón de crear usuario
submitBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;

    // Emitimos un evento 'crearUsuario' con el nombre de usuario
    socket.emit('crearUsuario', { username });
});

// Escuchamos la respuesta del servidor
socket.on('usuarioCreado', (message) => {
    responseText.textContent = message;
});

// Escuchar el evento de redirección del servidor
socket.on('redirect', (url) => {
    window.location.href = url; // Redirige a la URL proporcionada por el servidor 
});