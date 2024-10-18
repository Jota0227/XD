// Conectar con el servidor usando Socket.IO
const socket = io();

// Referencia a la lista de usuarios en el DOM
const userList = document.getElementById('userList');

// Escuchar el evento 'actualizarUsuarios' para obtener la lista de usuarios
socket.on('actualizarUsuarios', (usuarios) => {
    // Limpiar la lista actual
    userList.innerHTML = '';

    // Agregar cada usuario a la lista
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = usuario;
        userList.appendChild(li);
    });
});
