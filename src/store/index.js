import {configureStore} from "@reduxjs/toolkit";
import {uiReducer} from "./ui-slice";
import {cartReduce} from "./cart-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReduce
    }
});

export default store;