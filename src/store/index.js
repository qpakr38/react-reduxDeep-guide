import {configureStore} from "@reduxjs/toolkit";
import {uiAction} from "./ui-slice";

const store = configureStore({
    reducer:{ui: uiAction}
});

export default store;