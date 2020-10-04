const API_URL = 'https://localhost:44341/api/users/authenticate/';

class AuthService {
  login = async (username, password) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const response = await res.json();
    if (response && response.isAuthenticated) {
      localStorage.setItem('user', response.token);
    }
  };

  logout = () => {
    localStorage.removeItem('user');
  };

  register = () => {};

  getCurrentUser = () => {
    return localStorage.getItem('user');
  };
}

export default new AuthService();
