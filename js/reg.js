// Добавление аккаунта администратора при загрузке страницы
window.addEventListener('load', () => {
    const admin = { email: "admin1@gmail.com", password: "123456", name: "Всеволод" };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Проверяем, есть ли уже администратор
    const adminExists = users.some(user => user.email === admin.email);
    
    if (!adminExists) {
        users.push(admin);
        localStorage.setItem('users', JSON.stringify(users));
    }
});

// Переключение между формами
document.getElementById('to-login').addEventListener('click', () => {
    document.getElementById('registration-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
});

document.getElementById('to-register').addEventListener('click', () => {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('registration-form').classList.add('active');
});

// Регистрация
document.getElementById('registration-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const name = document.getElementById('regName').value;

    if (email && password && name) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Проверяем, есть ли уже пользователь с таким email
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
            alert('Пользователь с таким email уже зарегистрирован!');
            return;
        }
        
        // Добавляем нового пользователя
        users.push({ email, password, name });
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Регистрация успешна! Теперь вы можете войти.');
        document.getElementById('registration-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});

// Вход
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'cabinet.html';
    } else {
        alert('Неверный email или пароль!');
    }
});

// Общий код для бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (burger && mobileMenu) {
        burger.addEventListener('click', function() {
            this.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }
    
    // Для личного кабинета - обработка выхода
    const logoutBtn = document.getElementById('logout');
    const logoutMobileBtn = document.getElementById('logout-mobile');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
        });
    }
    
    if (logoutMobileBtn) {
        logoutMobileBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
        });
    }
});