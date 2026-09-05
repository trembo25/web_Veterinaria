const users = {
    admin: { password: 'admin123', role: 'Administrador' },
    cliente: { password: 'cliente123', role: 'Cliente' }
};

const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value.trim().toLowerCase();
    const password = form.password.value;

    if (!username || !password) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }

    const user = users[username];

    if (!user || user.password !== password) {
        loginMessage.textContent = 'Usuario o contraseña incorrectos.';
        loginMessage.className = 'login-message error';
        return;
    }

    localStorage.setItem('usuarioLogueado', JSON.stringify({
        username,
        role: user.role
    }));

    loginMessage.textContent = `Bienvenido, ${user.role}.`;
    loginMessage.className = 'login-message success';

    setTimeout(() => {
        location.href = username === 'admin' ? 'admin.html' : 'cliente.html';
    }, 500);
});