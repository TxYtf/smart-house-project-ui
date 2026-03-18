// import { Auth } from './auth.js'; // імпортуємо тільки коли використовуємо ES6 модулі (import/export)

// -----------------------
// ----- Логін форма -----
// -----------------------
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // const loginBtn = document.getElementById('loginBtn');
  // const btnText = document.getElementById('btnText');
  // const loadingSpinner = document.getElementById('loadingSpinner');
  // const errorAlert = document.getElementById('errorAlert');
  // const errorMessage = document.getElementById('errorMessage');

  // // Показуємо спінер
  // loginBtn.disabled = true;
  // btnText.style.display = 'none';
  // loadingSpinner.style.display = 'inline';

  clearAlerts(['errorAlert']);
  setLoading('loginBtn', 'btnText', 'loadingSpinner', true);

  try {
    const success = await Auth.login(email, password);

    if (success) {
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      // Перенаправляємо на основну сторінку
      window.location.href = 'index.html';
    } else {
      // errorMessage.textContent = 'Невірний email або пароль';
      // errorAlert.classList.remove('d-none');
      showError('errorAlert', 'errorMessage', 'Невірний E-mail або пароль');
    }
  } catch (error) {
    // errorMessage.textContent = 'Помилка при логіні: ' + error.message;
    // errorAlert.classList.remove('d-none');
    showError('errorAlert', 'errorMessage', 'Помилка при логіні: ' + error.message);
  } finally {
    // Приховуємо спінер
    // loginBtn.disabled = false;
    // btnText.style.display = 'inline';
    // loadingSpinner.style.display = 'none';
    setLoading('loginBtn', 'btnText', 'loadingSpinner', false);
  }
});

// ----------------------------
// ----- Реєстрація форма -----
// ----------------------------
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

  // const signupBtn = document.getElementById('signupBtn');
  // const signupBtnText = document.getElementById('signupBtnText');
  // const signupLoadingSpinner = document.getElementById('signupLoadingSpinner');
  // const signupErrorAlert = document.getElementById('signupErrorAlert');
  // const signupErrorMessage = document.getElementById('signupErrorMessage');
  // const signupSuccessAlert = document.getElementById('signupSuccessAlert');
  // const signupSuccessMessage = document.getElementById('signupSuccessMessage');

  // signupErrorAlert.classList.add('d-none');
  // signupSuccessAlert.classList.add('d-none');  
  clearAlerts(['signupErrorAlert', 'signupSuccessAlert']);

  if (password !== passwordConfirm) {
    // signupErrorMessage.textContent = 'Паролі не збігаються';
    // signupErrorAlert.classList.remove('d-none');
    showError('signupErrorAlert', 'signupErrorMessage', 'Паролі не збігаються');
    return;
  }

  // signupBtn.disabled = true;
  // signupBtnText.style.display = 'none';
  // signupLoadingSpinner.style.display = 'inline-block';
  setLoading('signupBtn', 'signupBtnText', 'signupLoadingSpinner', true);

  try {
    // const response = await fetch('https://api.smart-house/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password })
    // });
    // const data = await response.json();    
    const data = await Auth.signup(name, email, password);

    if (data.success || data.token) {
      // signupSuccessMessage.textContent = 'Реєстрація успішна! Перенаправляємо на логін...';
      // signupSuccessAlert.classList.remove('d-none');
      showSuccess('signupSuccessAlert', 'signupSuccessMessage', 'Реєстрація успішна! Перенаправляємо на логін...');
      document.getElementById('signupForm').reset();
      
      setTimeout(() => {
        //document.getElementById('signupForm').reset();
        showLogin({ preventDefault: () => {} });
      }, 2000);
    } else {
      // signupErrorMessage.textContent = data.message || 'Помилка при реєстрації';
      // signupErrorAlert.classList.remove('d-none');
      showError('signupErrorAlert', 'signupErrorMessage', data.message || 'Помилка при реєстрації');
    }
  } catch (error) {
    // signupErrorMessage.textContent = 'Помилка при реєстрації: ' + error.message;
    // signupErrorAlert.classList.remove('d-none');
    showError('signupErrorAlert', 'signupErrorMessage', 'Помилка при реєстрації: ' + error.message);
  } finally {
    // signupBtn.disabled = false;
    // signupBtnText.style.display = 'inline';
    // signupLoadingSpinner.style.display = 'none';
    setLoading('signupBtn', 'signupBtnText', 'signupLoadingSpinner', false);
  }
});

// ------------------------------------
// ----- Відновлення пароля форма -----
// ------------------------------------
document.getElementById('restorePasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('restoreEmail').value;

  // const restoreBtn = document.getElementById('restoreBtn');
  // const restoreBtnText = document.getElementById('restoreBtnText');
  // const restoreLoadingSpinner = document.getElementById('restoreLoadingSpinner');
  // const restoreErrorAlert = document.getElementById('restoreErrorAlert');
  // const restoreErrorMessage = document.getElementById('restoreErrorMessage');
  // const restoreSuccessAlert = document.getElementById('restoreSuccessAlert');
  // const restoreSuccessMessage = document.getElementById('restoreSuccessMessage');

  // restoreErrorAlert.classList.add('d-none');
  // restoreSuccessAlert.classList.add('d-none');
  clearAlerts(['restoreErrorAlert', 'restoreSuccessAlert']);

  // restoreBtn.disabled = true;
  // restoreBtnText.style.display = 'none';
  // restoreLoadingSpinner.style.display = 'inline-block';
  setLoading('restoreBtn', 'restoreBtnText', 'restoreLoadingSpinner', true);

  try {
    // const response = await fetch('https://api.smart-house/auth/restore', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // });
    // const data = await response.json();
    const data = await Auth.restorePassword(email);

    if (data.success) {
      // restoreSuccessMessage.textContent = 'Посилання для відновлення пароля надіслано на ваш email';
      // restoreSuccessAlert.classList.remove('d-none');
      showSuccess('restoreSuccessAlert', 'restoreSuccessMessage', 'Посилання для відновлення пароля надіслано на ваш email');
      document.getElementById('restorePasswordForm').reset();
      
      setTimeout(() => {
        // document.getElementById('restorePasswordForm').reset();
        showLogin({ preventDefault: () => {} });
      }, 3000);
    } else {
      // restoreErrorMessage.textContent = data.message || 'Помилка при відновленні пароля';
      // restoreErrorAlert.classList.remove('d-none');
      showError('restoreErrorAlert', 'restoreErrorMessage', data.message || 'Помилка при відновленні пароля');
    }
  } catch (error) {
    // restoreErrorMessage.textContent = 'Помилка: ' + error.message;
    // restoreErrorAlert.classList.remove('d-none');
    showError('restoreErrorAlert', 'restoreErrorMessage', 'Помилка: ' + error.message);
  } finally {
    // restoreBtn.disabled = false;
    // restoreBtnText.style.display = 'inline';
    // restoreLoadingSpinner.style.display = 'none';
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
  document.getElementById('loginCard').classList.remove('d-none');
  document.getElementById('signupCard').classList.add('d-none');
  document.getElementById('restorePasswordCard').classList.add('d-none');
}

function showSignup(e) {
  e.preventDefault();
  document.getElementById('loginCard').classList.add('d-none');
  document.getElementById('signupCard').classList.remove('d-none');
  document.getElementById('restorePasswordCard').classList.add('d-none');
}

function showRestorePassword(e) {
  e.preventDefault();
  document.getElementById('loginCard').classList.add('d-none');
  document.getElementById('signupCard').classList.add('d-none');
  document.getElementById('restorePasswordCard').classList.remove('d-none');
}

// Слухачі подій для посилань
document.getElementById('showSignupLink').addEventListener('click', showSignup);
document.getElementById('showRestorePasswordLink').addEventListener('click', showRestorePassword);
document.getElementById('showLoginFromSignup').addEventListener('click', showLogin);
document.getElementById('showLoginFromRestore').addEventListener('click', showLogin);