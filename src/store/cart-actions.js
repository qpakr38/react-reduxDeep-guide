import {uiAction} from "./ui-slice";
import {cartAction} from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://react-http-f752e-default-rtdb.firebaseio.com/cart.json");
            if (!response.ok) {
                throw  new Error('Could not fetch cart data!');
            }
            return await response.json();
        };

        try {
           const cartData = await fetchData();
           dispatch(cartAction.replaceCart({
               items: cartData.items || [],
               totalQuantity: cartData.totalQuantity
           }));
        } catch (error) {
            dispatch(uiAction.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }
    }
};
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