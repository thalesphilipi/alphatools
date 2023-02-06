import { configureStore, Store } from "@reduxjs/toolkit";
import autoBidCreationSlice from "./autoBidCreationSlice";
import autoBidInstancesSlice, { updateTime } from "./autoBidInstancesSlice";
import userSlice from "./userSlice";


export const store: Store = configureStore({
    reducer: {
        user: userSlice,
        autoBidInstances: autoBidInstancesSlice,
        autoBidCreation: autoBidCreationSlice
    }
})

setInterval(() => {
    store.dispatch(updateTime());
}, 1000);