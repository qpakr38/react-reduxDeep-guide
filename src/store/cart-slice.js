import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            state.totalQuantity++;
            state.changed = true;
            const addItem = action.payload;
            const existingItem = state.items.find(item => item.id === addItem.id);
            if (!existingItem) {
                state.items.push({
                    id: addItem.id,
                    price: addItem.price,
                    quantity: 1,
                    totalPrice: addItem.price,
                    name: addItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + addItem.price;
            }
        },
        removeItemFromCart(state, action) {
            state.totalQuantity--;
            state.changed = true;
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

export const cartAction = cartSlice.actions;
export const cartReduce = cartSlice.reducer;

export default cartSlice;