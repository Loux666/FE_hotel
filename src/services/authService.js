import api from '../api/axios';

const authService = {
  login: (credentials) => api.post('/login', credentials),
  register: (userInfo) => api.post('/register', userInfo),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
  updateProfile: (userData) => api.put('/user', userData)
};

export default authService;
