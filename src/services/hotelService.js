import api from '../api/axios';

const hotelService = {
  getHotels: (params) => api.get('/hotels', { params }),
  getHotelById: (id, params) => api.get(`/hotels/${id}`, { params }),
  searchLocations: (query) => api.get('/search-locations', { params: { query } }),
  getCoupons: () => api.get('/coupons')
};

export default hotelService;
