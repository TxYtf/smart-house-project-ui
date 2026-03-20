// import { Auth } from './auth.js'; // імпортуємо тільки коли використовуємо ES6 модулі (import/export)

// -----------------------
// ----- Логін форма -----
// -----------------------
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const login = document.getElementById('login').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  clearAlerts(['errorAlert']);
  setLoading('loginBtn', 'btnText', 'loadingSpinner', true);

  try {
    const success = await Auth.login(login, email, password);

    if (success) {
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      // Перенаправляємо на основну сторінку
      window.location.href = 'index.html';
    } else {
      showError('errorAlert', 'errorMessage', 'Невірний E-mail або пароль');
    }
  } catch (error) {
    showError('errorAlert', 'errorMessage', 'Помилка при логіні: ' + error.message);
  } finally {
    setLoading('loginBtn', 'btnText', 'loadingSpinner', false);
  }
});

// ----------------------------
// ----- Реєстрація форма -----
// ----------------------------
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('signupName').value;
  const login = document.getElementById('signupLogin').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

  clearAlerts(['signupErrorAlert', 'signupSuccessAlert']);

  if (password !== passwordConfirm) {
    showError('signupErrorAlert', 'signupErrorMessage', 'Паролі не збігаються');
    return;
  }

  setLoading('signupBtn', 'signupBtnText', 'signupLoadingSpinner', true);

  try {
    const data = await Auth.signup(name, login, email, password);

    if (data.success || data.token) {
      showSuccess('signupSuccessAlert', 'signupSuccessMessage', 'Реєстрація успішна! Перенаправляємо на логін...');
      document.getElementById('signupForm').reset();
      
      setTimeout(() => {
        showLogin({ preventDefault: () => {} });
      }, 2000);
    } else {
      showError('signupErrorAlert', 'signupErrorMessage', data.message || 'Помилка при реєстрації');
    }
  } catch (error) {
    showError('signupErrorAlert', 'signupErrorMessage', 'Помилка при реєстрації: ' + error.message);
  } finally {
    setLoading('signupBtn', 'signupBtnText', 'signupLoadingSpinner', false);
  }
});

// ------------------------------------
// ----- Відновлення пароля форма -----
// ------------------------------------
document.getElementById('restorePasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('restoreEmail').value;

  clearAlerts(['restoreErrorAlert', 'restoreSuccessAlert']);
  setLoading('restoreBtn', 'restoreBtnText', 'restoreLoadingSpinner', true);

  try {
    const data = await Auth.restorePassword(email);

    if (data.success) {
      showSuccess('restoreSuccessAlert', 'restoreSuccessMessage', 'Посилання для відновлення пароля надіслано на ваш email');
      document.getElementById('restorePasswordForm').reset();
      
      setTimeout(() => {
        showLogin({ preventDefault: () => {} });
      }, 3000);
    } else {
      showError('restoreErrorAlert', 'restoreErrorMessage', data.message || 'Помилка при відновленні пароля');
    }
  } catch (error) {
    showError('restoreErrorAlert', 'restoreErrorMessage', 'Помилка: ' + error.message);
  } finally {
    setLoading('restoreBtn', 'restoreBtnText', 'restoreLoadingSpinner', false);
  }
});

// Якщо користувач вже залогінений, перенаправляємо на основну сторінку
if (Auth.isAuthenticated()) {
  window.location.href = 'index.html';
}

// Допоміжні функції
function showError(alertId, messageId, message) {
  document.getElementById(alertId).classList.remove('d-none');
  document.getElementById(messageId).textContent = message;
}

function showSuccess(alertId, messageId, message) {
  const alert = document.getElementById(alertId);
  const messageSpan = document.getElementById(messageId);

  alert.classList.remove('d-none');
  messageSpan.textContent = message;
}

function setLoading(btnId, btnTextId, spinnerId, isLoading) {
  const btn = document.getElementById(btnId);
  const btnText = document.getElementById(btnTextId);
  const spinner = document.getElementById(spinnerId);

  btn.disabled = isLoading;
  btnText.style.display = isLoading ? 'none' : 'inline';
  spinner.style.display = isLoading ? 'inline-block' : 'none';
}

function clearAlerts(alertIds) {
  alertIds.forEach(id => {
    document.getElementById(id).classList.add('d-none');
  });
}

// Функції для переключення між формами логіну, реєстрації та відновлення пароля
function showLogin(e) {
  e.preventDefault();
  document.querySelector('.auth-header__subtitle').textContent = 'Система управління розумним будинком';
  document.getElementById('loginCard').classList.remove('d-none');
  document.getElementById('signupCard').classList.add('d-none');
  document.getElementById('restorePasswordCard').classList.add('d-none');
}

function showSignup(e) {
  e.preventDefault();
  document.querySelector('.auth-header__subtitle').textContent = 'Реєстрація нового облікового запису';
  document.getElementById('loginCard').classList.add('d-none');
  document.getElementById('signupCard').classList.remove('d-none');
  document.getElementById('restorePasswordCard').classList.add('d-none');
}

function showRestorePassword(e) {
  e.preventDefault();
  document.querySelector('.auth-header__subtitle').textContent = 'Відновлення пароля';
  document.getElementById('loginCard').classList.add('d-none');
  document.getElementById('signupCard').classList.add('d-none');
  document.getElementById('restorePasswordCard').classList.remove('d-none');
}

// Слухачі подій для посилань
document.getElementById('showSignupLink').addEventListener('click', showSignup);
document.getElementById('showRestorePasswordLink').addEventListener('click', showRestorePassword);
document.getElementById('showLoginFromSignup').addEventListener('click', showLogin);
document.getElementById('showLoginFromRestore').addEventListener('click', showLogin);