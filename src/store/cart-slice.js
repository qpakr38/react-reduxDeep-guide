import {createSlice} from '@reduxjs/toolkit';
import {uiAction} from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0
    },
    reducers: {
        addItemToCart(state, action) {
            state.totalQuantity++;
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
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiAction.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));
        const sendRequest = async () => {
            const response = await fetch(
                "https://react-http-f752e-default-rtdb.firebaseio.com/cart.json",
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                });
            if (!response.ok) {
                throw new Error('Sending cart data failed!');
            }
        }
        try {
            await sendRequest();
            dispatch(uiAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent cart data successfully!'
            }));
        } catch (error) {
            sendCartData().catch(error => {
                dispatch(uiAction.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!'
                }));
            });
        }
    };
};

export const cartAction = cartSlice.actions;
export const cartReduce = cartSlice.reducer;

export default cartSlice;