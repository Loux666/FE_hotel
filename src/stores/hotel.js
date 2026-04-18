import { defineStore } from 'pinia';
import hotelService from '../services/hotelService';

export const useHotelStore = defineStore('hotel', {
    state: () => ({
        hotels: [],
        isLoading: false,
        searchParams: {
            city: '',
            minPrice: null,
            maxPrice: null
        }
    }),
    actions: {
        async fetchHotels() {
            this.isLoading = true;
            try {
                const params = {
                    city: this.searchParams.city,
                    min_price: this.searchParams.minPrice,
                    max_price: this.searchParams.maxPrice,
                    stars: this.searchParams.stars,
                    type: this.searchParams.type
                };
                
                // Loại bỏ params có giá trị null hoặc rỗng để API không bị lỗi
                Object.keys(params).forEach(key => {
                    if (params[key] === null || params[key] === '' || params[key] === undefined) {
                        delete params[key];
                    }
                });

                const { data } = await hotelService.getHotels(params);
                this.hotels = data.data;
            } catch (error) {
                console.error('Lỗi fetch hotels', error);
            } finally {
                this.isLoading = false;
            }
        },
        setSearchParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
        }
    }
});
