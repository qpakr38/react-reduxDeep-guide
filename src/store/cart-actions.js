import {uiAction} from "./ui-slice";

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