import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import productReducer from './features/product/productSlice'
import addressReducer from './features/address/addressSlice'
import ratingReducer from './features/rating/ratingSlice'

import authReducer from './features/login/authSlice';
import wishlistReducer from './features/wishlist/wishlistSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            product: productReducer,
            address: addressReducer,
            rating: ratingReducer,

            auth: authReducer,

            wishlist: wishlistReducer,

        },
            // preloadedState: typeof window !== 'undefined' ? loadFromLocalStorage() : initialState,

    })
}