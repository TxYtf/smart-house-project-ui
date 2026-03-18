class Auth {
  static API_AUTH_URL = 'https://ne7yja1gxe.execute-api.eu-north-1.amazonaws.com/smart-house-api/auth';

  // ----- обробка логіну -----
  static async login(email, password) {
    const response = await fetch(`${this.API_AUTH_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // Парсимо відповідь    
    const data = await response.json();
    console.log('Login response:', data);

    // Якщо отримали токен, зберігаємо його і userId, і повертаємо true, інакше false
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      return true;
    }
    return false;
  }

  // ----- обробка реєстрації тового користувача -----
  static async signup(name, email, password) {
    const response = await fetch(`${this.API_AUTH_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    // Парсимо відповідь    
    const data = await response.json();
    console.log('Signup response:', data);
    return data;
  }

  // ----- обробка відновлення пароля -----
  static async restorePassword(email) {
    const response = await fetch(`${this.API_AUTH_URL}/restore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    // Парсимо відповідь  
    const data = await response.json();
    console.log('Restore password response:', data);
    return data;
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = 'login.html';
  }
}
