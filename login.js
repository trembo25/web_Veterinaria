const users = {
    admin: {
        password: 'admin123',
        role: 'Administrador'
    },
    cliente: {
        password: 'cliente123',
        role: 'Cliente'
    }
};

const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get('username').trim().toLowerCase();
    const password = formData.get('password');
    const user = users[username];

    if (!user || user.password !== password) {
        loginMessage.textContent = 'Usuario o contraseña incorrectos.';
        loginMessage.className = 'login-message error';
        return;
    }

    loginMessage.textContent = `Bienvenido, ${user.role}.`;
    loginMessage.className = 'login-message success';

    window.setTimeout(() => {
        window.location.href = username === 'admin' ? 'admin.html' : 'cliente.html';
    }, 500);
});
