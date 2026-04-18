import api from '../api/axios';

const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (payload) => api.post('/cart/add', payload),
  removeFromCart: (id) => api.delete(`/cart/remove/${id}`),
  getBookingHistory: () => api.get('/bookings')
};

export default cartService;
