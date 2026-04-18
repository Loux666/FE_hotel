import api from '@/api/axios';

const roomService = {
    getRecommendedRooms() {
        return api.get('/rooms/recommended');
    },
    
    // Add other room-related endpoints here if needed
    getRoomAvailability(roomId, params) {
        return api.get(`/rooms/${roomId}/availability`, { params });
    }
};

export default roomService;
